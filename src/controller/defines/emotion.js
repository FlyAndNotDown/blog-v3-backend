/**
 * /controller/define/emotion.js
 * @author John Kindem
 * @description ${commonUrlPrefix}/emotion 说说控制器源文件
 * @version v1.0
 */

import controllerConfig from '../../configs/controller';
import { Log } from '../../tool/log';

/**
 * ${commonUrlPrefix}/emotion 说说控制器
 */
export default {
    url: `${controllerConfig.commonUrlPrefix}/emotion`,
    get: (db, models) => {
        return async(ctx, next) => {
            // TODO
        };
    }
}
