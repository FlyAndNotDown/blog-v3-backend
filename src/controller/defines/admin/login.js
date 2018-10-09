/**
 * /controller/define/admin/login.js
 * @author John Kindem
 */

import controllerConfig from '../../../configs/controller';
import regexConfig from '../../../configs/regex';
import { Log } from "../../../tool/log";

const adminRegex = regexConfig.admin;

export default {
    url: `${controllerConfig.commonUrlPrefix}/admin/login`,
    get: function (db, models) {
        return async function (ctx) {
            // TODO
        }
    }
};