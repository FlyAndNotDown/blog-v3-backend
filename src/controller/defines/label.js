/**
 * /controller/define/label.js
 * @author John Kindem
 * @description /${commonUrlPrefix}/label 控制器
 * @version v1.0
 */

import controllerConfig from '../../configs/controller';
import { Log } from "../../tool/log";

/**
 * /label 控制器
 */
export default {
    url: `${controllerConfig.commonUrlPrefix}/label`,
    get: (db, models) => {
        return async (ctx, next) => {
            await next();
            // TODO
        }
    }
}