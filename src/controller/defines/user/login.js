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
 * @description {get} get salt of user
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
   url: `${controllerConfig.commonUrlPrefix}/user/login`
};