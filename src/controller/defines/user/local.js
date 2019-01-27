/**
 * /controller/defines/user/local.js
 * @author John Kindem
 * @description source file for local user controller
 * @version v1.0
 */

import controllerConfig from '../../../configs/controller';
import regexConfig from '../../../configs/regex';
import { Log } from '../../../tool/log';

const { commonUrlPrefix } = controllerConfig;
const userRegex = regexConfig.user;

/**
 * /${commonUrlPrefix}/user/local controller
 * @description {get} get local user's salt of password
 * * @param {'salt'} type type of get request
 * * @param {string} email email of local user
 * @description {get} get local user's account actived status
 * * @param {'actived'} type type of get request
 * * @param {string} email email of local user
 * @description {post} register a new local user account
 * * @param {string} email email of user
 * * @param {string} nickname nickname of user
 * * @param {string} salt salt of password
 * * @param {string} password sha256 hash value of password
 */
export default {
    url: `${commonUrlPrefix}/user/local`,
    get: (db, models) => {
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

            // do different thing when get different type
            switch (type) {
                case 'salt':
                    // get params
                    const email = query.email || null;

                    // check the params
                    if (!email || !email.match(userRegex.email)) {
                        Log.error('status 400', `email: ${email}`);
                        return context.response.status = 400;
                    }

                    // query the database
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

                    // if the target user is not exist
                    if (!user) {
                        return context.response.body = {
                            salt: null
                        };
                    }

                    // if the target user is exist
                    return context.response.body = {
                        salt: user.salt || null
                    };
                case 'actived':
                    // get params
                    const email = query.email || null;

                    // check the params
                    if (!email || !email.match(userRegex.email)) {
                        Log.error('status 400', `email: ${email}`);
                        return context.response.status = 400;
                    }

                    // query the database
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

                    // if the target user is not exist
                    if (!user) {
                        return context.response.body = {
                            actived: null
                        };
                    }

                    // if the target user is exist
                    return context.response.body = {
                        actived: user.actived || false
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

            // TODO
        };
    }
};
