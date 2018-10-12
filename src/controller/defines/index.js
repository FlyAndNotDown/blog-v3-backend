/**
 * /controller/define/index.js
 * @author John Kindem
 * @description ${commonUrlPrefix}/index 控制器源文件
 * @version v1.0
 */

import controllerConfig from '../../configs/controller';
import regexConfig from '../../configs/regex';
import { Log } from '../../tool/log';

const normalRegex = regexConfig.normal;
const indexGetMaxAmount = controllerConfig.index.get.maxAmount;

/**
 * ${commonUrlPrefix}/index 控制器
 */
export default {
    url: `${controllerConfig.commonUrlPrefix}/index`,
    get: (db, models) => {
        return async (ctx, next) => {
            await next();

            // 获取参数
            let query = ctx.request.query || {};
            let emotionStartId = query.emotionStartId || null;
            let postStartId = query.postStartId || null;
            let amount = query.amount || null;

            // 参数校验
            if (!emotionStartId || !emotionStartId.match(normalRegex.naturalNumber)) {
                Log.error('status 400', `emotionStartId: ${emotionStartId}`);
                return ctx.response.status = 400;
            }
            if (!postStartId || !postStartId.match(normalRegex.naturalNumber)) {
                Log.error('status 400', `postStartId: ${postStartId}`);
                return ctx.response.status = 400;
            }
            if (!amount || !amount.match(normalRegex.naturalNumber)) {
                Log.error('status 400', `amount: ${amount}`);
                return ctx.response.status = 400;
            }

            // 看 amount 是否超过了最大设定
            if (amount > indexGetMaxAmount) {
                Log.error(`status 400`, `amount is too big, amount: ${amount}`);
                return ctx.response.status = 400;
            }

            let postList;
            let emotinList;

            // 发起查询
            // TODO
        };
    }
}
