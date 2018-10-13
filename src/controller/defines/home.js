/**
 * /controller/define/home.js
 * @author John Kindem
 * @description ${commonUrlPrefix}/home 主页控制器源文件
 * @version v1.0
 */

import controllerConfig from '../../configs/controller';
import regexConfig from '../../configs/regex';
import { Log } from '../../tool/log';
import Sequelize from 'sequelize';

const normalRegex = regexConfig.normal;
const indexGetMaxAmount = controllerConfig.index.get.maxAmount;

const Op = Sequelize.Op;

/**
 * ${commonUrlPrefix}/home 控制器
 */
export default {
    url: `${controllerConfig.commonUrlPrefix}/home`,
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
                Log.error('status 400', `amount is too big, amount: ${amount}`);
                return ctx.response.status = 400;
            }

            let postList;
            let emotionList;

            // 发起文章查询
            try {
                if (postStartId === 0) {
                    // 如果 startId == 0, 则说明是第一页
                    postList = await models.post.findAll({
                        limit: amount,
                        order: [
                            ['id', 'DESC']
                        ]
                    });
                } else {
                    // 如果 startId != 0，则说明不是第一页
                    postList = await models.post.findAll({
                        limit: amount,
                        where: {
                            id: {
                                [Op.lt]: postStartId
                            }
                        },
                        order: [
                            ['id', 'DESC']
                        ]
                    });
                }
            } catch(e) {
                Log.error('status 500', e);
                return ctx.response.status = 500;
            }

            // 发起说说查询
            try {
                if (emotionStartId === 0) {
                    // 如果 startId == 0, 则说明是第一页
                    emotionList = await models.emotion.findAll({
                        limit: amount,
                        order: [
                            ['id', 'DESC']
                        ]
                    });
                } else {
                    // 如果 startId != 0，则说明不是第一页
                    emotionList = await models.emotion.findAll({
                        limit: amount,
                        where: {
                            id: {
                                [Op.lt]: emotionStartId
                            }
                        },
                        order: [
                            ['id', 'DESC']
                        ]
                    });
                }
            } catch(e) {
                Log.error('status 500', e);
                return ctx.response.status = 500;
            }

            // 保护
            postList = postList || [];
            emotionList = emotionList || [];

            let blockList = [];
            let i = 0, j = 0;
            let count = 0;

            // 开始添加
            while (
                count < amount &&
                i < postList.length &&
                j < emotionList.length
            ) {
                // TODO 时间比较，并且添加到 blockList
            }

            // TODO 返回结果
        };
    }
}
