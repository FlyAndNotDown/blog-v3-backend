/**
 * /controller/define/admin/login.js
 * @author John Kindem
 */

import controllerConfig from '../../configs/controller';
import { Log } from "../../tool/log";

/**
 * /test 控制器
 */
export default {
    url: `${controllerConfig.commonUrlPrefix}/test`,
    get: (db, models) => {
        return async (ctx, next) => {
            await next();

            ctx.session.test = 'hello';
            return null;
        }
    }
}