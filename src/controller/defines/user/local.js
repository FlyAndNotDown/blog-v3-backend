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
 * @description {post} register a new local user account
 * * @param {string} username username of user
 * * @param {string} nickname nickname of user
 * * @param {string} salt salt of password
 * * @param {string} password sha256 hash value of password
 */
export default {
    url: `${commonUrlPrefix}/user/local`,
    post: (db, models) => {
        return async (ctx, next) => {
            await next();

            // get params
            const query = ctx.request.query || {};
            const username = query.username || null;
            const nickname = query.nickname || null;
            const salt = query.salt || null;
            const password = query.password || null;

            // check the params
            if (!username || !username.match(userRegex.username)) {
                Log.error('status 400', `username: ${username}`);
                return ctx.response.status = 400;
            }
            if (!nickname || !nickname.match(userRegex.nickname)) {
                Log.error('status 400', `nickname: ${nickname}`);
                return ctx.response.status = 400;
            }
            if (!salt || !salt.match(userRegex.salt)) {
                Log.error('status 400', `salt: ${salt}`);
                return ctx.response.status = 400;
            }
            if (!password || !password.match(userRegex.passwordHash)) {
                Log.error('status 400', `password: ${password}`);
                return ctx.response.status = 400;
            }

            // TODO
        };
    }
};
