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
 * * @param {'info'} type type of get
 * @description {post} local user login
 * * @param {'local'} userType type of user
 * * @param {string} email email of local user
 * * @param {string} password sha256 hash of password
 * @description {post} GitHub user login
 * * @TODO
 * @description {post} QQ user login
 * * @TODO
 * @description {post} WeiBo user login
 * * @TODO
 * @description {delete} logout
 */
export default {
    url: `${commonUrlPrefix}/user/login`,
    get: (db, models) => {
        return async (context, next) => {
            await next();

            // TODO
        };
    },
    post: (db, models) => {
        return async (context, next) => {
            await next();

            // TODO
        };
    },
    delete: (db, models) => {
        return async (context, next) => {
            await next();

            // TODO
        };
    }
};
