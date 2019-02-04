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
 * @description {post} user login api
 * @param {'github'} type type of request
 * @todo
 * 
 * @description {post} user login api
 * @param {'qq'} type type of request
 * @todo
 * 
 * @description {post} user login api
 * @param {'weibo'} type tpye of request
 * @todo
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
    }
};