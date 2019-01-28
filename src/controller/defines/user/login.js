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
 */
export default {
   url: `${controllerConfig.commonUrlPrefix}/user/login`
};