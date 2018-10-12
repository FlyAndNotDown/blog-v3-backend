/**
 * /controller/define/index.js
 * @author John Kindem
 * @description ${commonUrlPrefix}/index 控制器源文件
 * @version v1.0
 */

import controllerConfig from '../../configs/controller';
import { Log } from '../../tool/log';

/**
 * ${commonUrlPrefix}/index 控制器
 */
export default {
    url: `${controllerConfig.commonUrlPrefix}/index`,
    get: (db, models) => {
        return async (ctx, next) => {
            // TODO
        };
    }
}
