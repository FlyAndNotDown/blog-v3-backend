/**
 * /controller/defines/user/login.js
 * @author John Kindem
 * @description source file for /${commonUrlPrefix}/user/login controller
 * @version v1.0
 */

import controllerConfig from '../../../configs/controller';
import regexConfig from '../../../configs/regex';
import { Log } from '../../../tool/log';

const { commonUrlPrefix } = controllerConfig;
const userRegex = regexConfig.user;

/**
 * /${commonUrlPrefix}/user/login controller
 * @description {get} get login user info
 * @param {'info'} type type of get
 * 
 * @description {post} local user login
 * @param {'local'} userType type of user
 * @param {string} email email of local user
 * @param {string} password sha256 hash of password
 * 
 * @description {post} GitHub user login
 * @TODO
 * 
 * @description {post} QQ user login
 * @TODO
 * 
 * @description {post} WeiBo user login
 * @TODO
 * 
 * @description {delete} logout
 */
export default {
    url: `${commonUrlPrefix}/user/login`,
    get: (db, models) => {
        return async (context, next) => {
            await next();

            // get type params
            const query = context.request.query || {};
            const type = query.type || null;

            // check the params
            if (!type) {
                Log.error('status 400', `type: ${type}`);
                return context.response.status = 400;
            }

            // so different thing when catch different type
            switch (type) {
                case 'info':
                    // return the info in the session
                    return context.response.body = {
                        login: !!context.session.userLogin,
                        info: context.session.userInfo || null
                    };
                default:
                    Log.error('status 400', `type: ${type}`);
                    return context.response.status = 400;
            }
        };
    },
    post: (db, models) => {
        return async (context, next) => {
            await next();

            // get params
            const body = context.request.body || {};
            const userType = body.userType || null;

            // check the params
            if (!userType) {
                Log.error('status 400', `userType: ${userType}`);
                return context.response.status = 400;
            }

            // do different thing when get different 'userType'
            switch (userType) {
                case 'local':
                    // get params
                    const email = body.email || null;
                    const password = body.password || null;

                    // check params
                    if (!email || !email.match(userRegex.email)) {
                        Log.error('status 400', `email: ${email}`);
                        return context.response.status = 400;
                    }
                    if (!password || !password.match(userRegex.passwordHash)) {
                        Log.error('status 400', `password: ${password}`);
                        return context.response.status = 400;
                    }

                    // query the database to get user object
                    let user;
                    try {
                        user = await models.user.findOne({
                            where: {
                                email: email
                            }
                        });
                    } catch (e) {
                        Log.error('status 500', e);
                        return context.response.status = 500;
                    }

                    // if not found
                    if (!user) {
                        return context.response.body = {
                            success: false
                        };
                    }

                    // if found, check the password
                    if (user.password !== password) {
                        return context.response.body = {
                            success: false
                        };
                    }

                    // if login success, save the login status to the session
                    context.session.userLogin = true;
                    context.session.userInfo = {
                        id: user.id,
                        type: user.type,
                        key: user.key,
                        nickname: user.nickname,
                        avatar: user.avatar,
                        username: user.username
                    };

                    // return the result
                    return context.response.body = {
                        success: true
                    };
                case 'github':
                    // TODO
                    return;
                case 'qq':
                    // TODO
                    return;
                case 'weibo':
                    // TODO
                    return;
                default:
                    Log.error('status 400', `userType: ${userType}`);
                    return context.response.status = 400;
            }
        };
    },
    delete: (db, models) => {
        return async (context, next) => {
            await next();

            // clear info in the session
            context.session.userLogin = false;
            context.session.userInfo = null;

            return;
        };
    }
};
