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
 * * @param {'salt'} type type of get request
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

            // TODO
        };
    },
    post: (db, models) => {
        return async (context, next) => {
            await next();

            // TODO
        };
    }
};
