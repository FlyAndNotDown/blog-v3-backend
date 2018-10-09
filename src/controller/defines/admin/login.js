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
    get: (db, models) => {
        return async ctx => {
            // 获取参数
            const query = ctx.request.query || {};
            const type = query.type || null;
            const username = query.username || null;

            // 参数校验
            if (!type) {
                Log.error('status 400', `type: ${type}`);
                ctx.response.status = 400;
                return null;
            }

            // 根据 get 的类型进行处理
            switch (type) {
                case 'salt':
                    // 如果是获取盐
                    // 参数校验
                    if (!username || !username.match(adminRegex.username)) {
                        Log.error('status 400', `username: ${username}`);
                        ctx.response.status = 400;
                        return null;
                    }
                    // TODO 执行查询
                    let admin = await models.admin.findOne({
                        where: {
                            username: username
                        }
                    });
                    return null;
                case 'info':
                    // TODO
                    return null;
                default:
                    Log.error('status 400', `type: ${type}`);
                    ctx.response.status = 400;
                    return null;
            }
        }
    }
};