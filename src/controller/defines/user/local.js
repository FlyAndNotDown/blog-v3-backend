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
 * @param {string} passwordHash sha256 hash value of user's password
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
    }
};