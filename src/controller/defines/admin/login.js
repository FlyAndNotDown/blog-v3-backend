/**
 * /controller/defines/admin/login.js
 * @author John Kindem
 * @description source file for admin login controller
 * @version v1.0
 */

import controllerConfig from '../../../configs/controller';
import regexConfig from '../../../configs/regex';
import { Log } from "../../../tool/log";

const adminRegex = regexConfig.admin;

/**
 * //admin/login controller
 * @description {get} get salt
 * @param {'salt'} type type of request
 * @param {string} username username of admin
 * 
 * @description {get} get login info
 * @param {'info'} type type of request
 * 
 * @description {post} login check
 * @param {string} username username of user
 * @param {string} password sha256 hash value of password
 * 
 * @description {delete} logout
 */
export default {
    url: `${controllerConfig.commonUrlPrefix}/admin/login`,
    get: (db, models) => {
        return async (ctx, next) => {
            await next();

            // get params
            const query = ctx.request.query || {};
            const type = query.type || null;
            const username = query.username || null;

            // check the params
            if (!type) {
                Log.error('status 400', `type: ${type}`);
                ctx.response.status = 400;
                return null;
            }

            // do different thing when get different type
            switch (type) {
                case 'salt':
                    // check params
                    if (!username || !username.match(adminRegex.username)) {
                        Log.error('status 400', `username: ${username}`);
                        ctx.response.status = 400;
                        return null;
                    }

                    // query the database
                    let admin;
                    try {
                        admin = await models.admin.findOne({
                            where: {
                                username: username
                            }
                        });
                    } catch (e) {
                        Log.error('status 500', e);
                        ctx.response.status = 500;
                        return null;
                    }

                    // if not exist
                    if (!admin) {
                        ctx.response.body = {
                            salt: null
                        };
                        return null;
                    }

                    // return result
                    ctx.response.body = {
                        salt: admin.salt
                    };
                    return null;
                case 'info':
                    // query session & return the result
                    ctx.response.body = {
                        login: !!ctx.session.adminLogin,
                        info: ctx.session.adminInfo || null
                    };
                    return null;
                default:
                    Log.error('status 400', `type: ${type}`);
                    ctx.response.status = 400;
                    return null;
            }
        };
    },
    post: (db, models) => {
        return async (ctx, next) => {
            await next();

            // get params
            const body = ctx.request.body || {};
            const username = body.username || null;
            const password = body.password || null;

            // params check
            if (!username || !username.match(adminRegex.username)) {
                Log.error('status 400', `username: ${username}`);
                ctx.response.status = 400;
                return null;
            }
            if (!password || !password.match(adminRegex.passwordHash)) {
                Log.error('status 400', `password: ${password}`);
                ctx.response.status = 400;
                return null;
            }

            // query the database
            let admin;
            try {
                admin = await models.admin.findOne({
                    where: {
                        username: username
                    }
                });
            } catch (e) {
                Log.error('status 500', e);
                ctx.response.status = 500;
                return null;
            }

            // if there is no result
            if (!admin) {
                ctx.response.body = {
                    success: false
                };
                return null;
            }

            // if got it
            if (admin.password !== password) {
                ctx.response.body = {
                    success: false
                };
                return null;
            }

            // if succeed
            // save all info to session
            ctx.session.adminLogin = true;
            ctx.session.adminInfo = {
                id: admin.id,
                name: admin.name,
                username: admin.username,
                phone: admin.phone
            };

            // return result
            ctx.response.body = {
                success: true
            };
            return null;
        };
    },
    delete: (db, models) => {
        return async (ctx, next) => {
            await next();

            // delete user's info in session
            ctx.session.adminLogin = false;
            ctx.session.adminInfo = null;

            return;
        };
    }
};
