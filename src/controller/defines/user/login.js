/**
 * /controller/defines/user/local.js
 * @author John Kindem
 * @description source file for //user/login controller
 * @version v1.0
 */

import controllerConfig from '../../../configs/controller';
import regexConfig from '../../../configs/regex';
import { Log } from '../../../tool/log';

const userRegex = regexConfig.user;

/**
 * //user/login controller
 * @description {get} get login user's info
 * @param {'info'} type type of get request
 * 
 * @description {get} get salt of local user
 * @param {'salt'} type type of get request
 * @param {string} email email of user
 * 
 * @description {post} user login api
 * @param {'local'} type type of request
 * @param {string} email email of user
 * @param {string} password password's sha256 hash value of user
 * 
 * @description {delete} logout api
 */
export default {
    url: `${controllerConfig.commonUrlPrefix}/user/login`,
    get: (database, models) => {
        return async (context, next) => {
            await next();

            // get params
            const query = context.request.query || {};
            const type = query.type || null;

            // check params
            if (!type) {
                Log.error('status 400', `type: ${type}`);
                return context.response.status = 400;
            }

            // do different thing when get different type
            switch (type) {
                case 'info':
                    // get info from session
                    return context.response.body = {
                        login: !!context.session.userLogin,
                        info: context.session.userInfo || {}
                    };
                case 'salt':
                    // get params
                    const email = query.email || null;

                    // check params
                    if (!email || !email.match(userRegex.email)) {
                        Log.error('status 400', `email: ${email}`);
                        return context.response.status = 400;
                    }

                    // query database to get user object
                    let user;
                    try {
                        user = await models.user.findOne({
                            where: {
                                type: 'local',
                                email: email
                            }
                        });
                    } catch (e) {
                        Log.error('status 500', e);
                        return context.response.status = 500;
                    }

                    // if get nothing
                    if (!user) {
                        return context.response.body = {
                            salt: null
                        };
                    }

                    // if get a user object, get salt in object
                    let salt = user.salt
                    return context.response.body = {
                        salt: salt || null
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
            const type = body.type || null;

            // check params
            if (!type) {
                Log.error('status 400', `type: ${type}`);
                return context.response.status = 400;
            }

            // do different thing when get different type
            switch (type) {
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

                    // query database to get user object
                    let localUser;
                    try {
                        localUser = await models.user.findOne({
                            where: {
                                type: 'local',
                                email: email
                            }
                        });
                    } catch (e) {
                        Log.error('status 500', e);
                        return context.response.status = 500;
                    }

                    // if get no object
                    if (!localUser) {
                        return context.response.body = {
                            success: false
                        };
                    }

                    // if get the object, check password & email
                    if (localUser.password !== password) {
                        return context.response.body = {
                            success: false
                        };
                    }

                    // save info to session and return result
                    context.session.userLogin = true;
                    context.session.userInfo = {
                        id: localUser.id || null,
                        type: localUser.type || null,
                        key: null,
                        nickname: localUser.nickname || null,
                        avatar: null,
                        email: localUser.email || null
                    };
                    return context.response.body = {
                        success: true
                    };
                default:
                    Log.error('status 400', `type: ${type}`);
                    return context.response.status = 400;
            }
        };
    },
    delete: (database, models) => {
        return async (context, next) => {
            // clear all user info in session
            context.session.userLogin = false;
            context.session.userInfo = {};

            // return result
            return context.response.body = {
                success: true
            };
        };
    }
};