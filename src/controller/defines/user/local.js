/**
 * /controller/defines/user/local.js
 * @author John Kindem
 * @description source file for //user/local controller
 * @version v1.0
 */

import controllerConfig from '../../../configs/controller';
import regexConfig from '../../../configs/regex';
import { Log } from '../../../tool/log';
import { CpatchaTool } from '../../../tool/captcha';

const userRegex = regexConfig.user;

/**
 * //user/local controller
 * @description {get} send a captcha email to user's email box
 * @param {'captcha'} type type of get request
 * @param {string} email email of user
 * 
 * @description {get} email usage
 * @param {'emailUsage'} type if the email was used
 * @param {string} email email of user
 * 
 * @description {post} register a new local user
 * @param {string} email email of user
 * @param {string} captcha captcha
 * @param {string} nickname of user
 * @param {string} salt salt of password
 * @param {string} password sha256 hash value of user's password
 */
export default {
    url: `${controllerConfig.commonUrlPrefix}/user/local`,
    get: (database, models) => {
        return async (context, next) => {
            await next();

            // get params
            const query = context.request.query || {};
            const type = query.type || null;

            // check the params
            if (!type) {
                Log.error('status 400', `type: ${type}`);
                return context.response.status = 400;
            }

            // do different thing when get different 'type' value
            switch (type) {
                case 'captcha':
                    // get params
                    const email1 = query.email || null;

                    // check params
                    if (!email1 || !email1.match(userRegex.email)) {
                        Log.error('status 400', `email: ${email1}`);
                        return context.response.status = 400;
                    }

                    // get a random captcha
                    let captcha = CpatchaTool.getRandomCaptcha();

                    // save it to session
                    context.session.captcha = captcha;
                    context.session.registerEmail = email1;

                    // send a email to user's email box
                    CpatchaTool.sendCaptchaMail(email1, captcha);

                    // return result
                    return context.response.body = {
                        success: true
                    };
                case 'emailUsage':
                    // get params
                    const email2 = query.email || null;

                    // check params
                    if (!email2 || !email2.match(userRegex.email)) {
                        Log.error('status 400', `email: ${email2}`);
                        return context.response.status = 400;
                    }

                    // query the database
                    let count = 1;
                    try {
                        count = await models.user.count({
                            where: {
                                type: 'local',
                                email: email2
                            }
                        });
                    } catch (e) {
                        Log.error('status 500', e);
                        return context.response.status = 500;
                    }

                    // if the email has exist
                    if (count > 0) {
                        return context.response.body = {
                            exist: true
                        };
                    }

                    // if the email has not exist
                    return context.response.body = {
                        exist: false
                    };
                default:
                    Log.error('status 400', `type: ${type}`);
                    return context.response.status = 400;
            }
        };
    },
    post: (database, models) => {
        return async (context, next) => {
            await next();

            // get params
            const body = context.request.body || {};
            const email = body.email || null;
            const captcha = body.captcha || null;
            const nickname = body.nickname || null;
            const salt = body.salt || null;
            const password = body.password || null;

            // check params
            if (!email || !email.match(userRegex.email)) {
                Log.error('status 400', `email: ${email}`);
                return context.response.status = 400;
            }
            if (!captcha || !captcha.match(userRegex.captcha)) {
                Log.error('status 400', `captcha: ${captcha}`);
                return context.response.status = 400;
            }
            if (!nickname || !nickname.match(userRegex.nickname)) {
                Log.error('status 400', `nickname: ${nickname}`);
                return context.response.status = 400;
            }
            if (!salt || !salt.match(userRegex.salt)) {
                Log.error('status 400', `salt: ${salt}`);
                return context.response.status = 400;
            }
            if (!password || !password.match(userRegex.password)) {
                Log.error('status 400', `password: ${password}`);
                return context.response.status = 400;
            }

            // check captcha
            if (email !== context.session.registerEmail) {
                return context.response.body = {
                    success: false,
                    reason: '注册邮箱发生变更，请刷新验证码重试'
                };
            }
            if (captcha !== context.session.captcha) {
                return context.response.body = {
                    success: false,
                    reason: '验证码错误'
                };
            }

            // check email usage
            let emailCount = 1;
            try {
                emailCount = await models.user.count({
                    where: {
                        type: 'local',
                        email: email
                    }
                });
            } catch (e) {
                Log.error('status 500', e);
                return context.response.status = 500;
            }

            // if the email has exist
            if (count > 0) {
                return context.response.body = {
                    success: false,
                    reason: '邮箱已经被注册过了'
                };
            }

            // if the email is not exist
            // create a new local user object in database
            let user;
            try {
                user = await models.user.create({
                    type: 'local',
                    nickname: nickname,
                    email: email,
                    password: password,
                    salt: salt
                });
            } catch (e) {
                Log.error('status 500', e);
                return context.response.status = 500;
            }

            // if failed
            if (!user) {
                return context.response.body = {
                    success: false,
                    reason: '注册失败，请稍后重试'
                };
            }

            // if create success, save all info to session
            context.session.userLogin = true;
            context.session.userInfo = {
                id: user.id || null,
                type: user.type || null,
                key: null,
                nickname: user.nickname || null,
                avatar: null,
                email: user.email || null
            };

            // return callback info
            return context.response.body = {
                success: true
            };
        };
    }
};