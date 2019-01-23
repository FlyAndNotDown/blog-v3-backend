/**
 * /controller/defines/user/login.js
 * @author John Kindem
 * @description /${commonUrlPrefix}/user/login 控制器
 * @version v1.0
 */

import controllerConfig from '../../../configs/controller';
import regexConfig from '../../../configs/regex';
import { Log } from '../../../tool/log';

const { commonUrlPrefix } = controllerConfig;
const userRegex = regexConfig.user;

/**
 * /${commonUrlPrefix}/user/login 控制器
 * @description {get} get login user info
 * * @param {'info'} type type of get
 * @description {post} user login
 * * @param {'local'} userType type of user
 * * @param {string} username username
 * * @param {string} password sha256 hash of password
 * @description {delete} logout
 * * @todo
 */
export default {
    url: `${commonUrlPrefix}/user/login`,
    get: (db, models) => {
        return async (ctx, next) => {
            await next();

            // get type param
            const query = ctx.request.query || {};
            const type = query.type || null;

            // check the param
            if (!type) {
                Log.error('status 400', `type: ${type}`);
                return ctx.response.status = 400;
            }

            // do something due type
            switch (type) {
                case 'info':
                    // if get type is 'info', get user info from session
                    return ctx.response.body = {
                        login: !!ctx.session.userLogin,
                        info: ctx.session.userInfo || null
                    };
                default:
                    Log.error('status 400', `type: ${type}`);
                    return ctx.response.status = 400;
            }
        };
    },
    post: (db, models) => {
        return async (ctx, next) => {
            await next();

            // get params
            const query = ctx.request.query || {};
            const userType = query.userType || null;

            // check the params
            if (!userType) {
                Log.error('status 400', `userType: ${userType}`);
                return ctx.response.status = 400;
            }

            // different deal when different userType
            switch (userType) {
                case 'local':
                    // get the params
                    const body = ctx.request.body || {};
                    const username = body.username || null;
                    const password = body.password || null;

                    // check the params
                    if (!username || !username.match(userRegex.username)) {
                        Log.error('status 400', `username: ${username}`);
                        return ctx.response.status = 400;
                    }
                    if (!password || !password.match(userRegex.passwordHash)) {
                        Log.error('status 400', `password: ${password}`);
                        return ctx.response.status = 400;
                    }

                    // query the database to get user object
                    let user;
                    try {
                        user = await models.user.findOne({
                            where: {
                                username: username
                            }
                        });
                    } catch (e) {
                        Log.error('status 500', e);
                        return ctx.response.status = 500;
                    }

                    // if not found
                    if (!user) {
                        return ctx.response.body = {
                            success: false
                        };
                    }

                    // if found, check the password
                    if (user.password !== password) {
                        return ctx.response.body = {
                            success: false
                        };
                    }

                    // if check success, save the login status to the session
                    ctx.session.userLogin = true;
                    ctx.session.userInfo = {
                        id: user.id,
                        type: user.type,
                        key: user.key,
                        nickname: user.nickname,
                        avatar: user.avatar,
                        username: user.username
                    };

                    // return the result
                    return ctx.response.body = {
                        success: true
                    };
                case 'github':
                    // TODO
                    return null;
                case 'qq':
                    // TODO
                    return null;
                default:
                    Log.error('status 400', `userType: ${userType}`);
                    break;
            }
        };
    },
    delete: (db, models) => {
        return async (ctx, next) => {
            await next();

            // delete the session info
            ctx.session.userLogin = false;
            ctx.session.userInfo = null;

            return;
        };
    }
};
