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
        return async (ctx, next) => {
            await next();
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

                    // 查询管理员用户
                    let admin = await models.admin.findOne({
                        where: {
                            username: username
                        }
                    });

                    // 如果管理员的用户名不存在，则返回结果
                    if (!admin) {
                        ctx.response.body = {
                            salt: null
                        };
                        return null;
                    }

                    // 如果查到了管理员信息，返回盐
                    ctx.response.body = {
                        salt: admin.salt
                    };
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