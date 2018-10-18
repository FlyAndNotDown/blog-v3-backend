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
 * @description post 新建说说
 * * @param {string} content 内容
 */
export default {
    url: `${controllerConfig.commonUrlPrefix}/emotion`,
    get: (db, models) => {
        return async(ctx, next) => {
            await next();

            // 校验管理员登录情况
            if (!ctx.session.adminLogin) {
                // 如果没有登录
                Log.error('status 401', `session.adminLogin: ${ctx.session.adminLogin}`);
                return ctx.response.status = 401;
            }

            // 如果已经登陆了，则允许写说说
            const requestBody = ctx.request.body || {};
            const content = requestBody.content || null;

            // TODO 如果未来支持 Markdown，则添加过滤器

            // 存入数据库
            try {
                await models.emotion.create({
                    content: content
                });
            } catch (e) {
                Log.error('status 500', e);
                return ctx.response.status = 500;
            }

            // 完成之后返回成功
            return ctx.response.body = {
                success: true
            };
        };
    }
}
