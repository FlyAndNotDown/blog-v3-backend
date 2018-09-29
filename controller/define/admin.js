/**
 * /controller/define/admin.js
 * @author John Kindem
 */

const controllerConfig = require('../../config/controller');
const settings = require('../../settings');
const Log = require('../../tool/log');
const regexConfig = require('../../config/regex');

const url = `${controllerConfig.commonUrlPrefix}/admin`;

module.exports = {
    url: url,
    /**
     * 获取盐
     * @param  {object} connection 数据库连接
     * @param  {object} model      数据库模型
     * @return {function}          处理函数
     */
    get: function(connection, model) {
        return function(request, response) {
            // 服务器日志
            Log.log(`get ${url}`);

            // 参数获取
            let username = request.query.username || null;
            // 参数校验
            if (!username || !username.match(regexConfig.admin.username)) {
                return response.json({
                    success: false,
                    reason: '参数错误'
                });
            }

            // 看用户名是否存在
            model.admin.one({ username: username }, (err, adminObject) => {
                if (err) {
                    return response.json({
                        success: false,
                        reason: '查询错误'
                    });
                }
                // 如果用户不存在
                if (!adminObject) {
                    return response.json({
                        success: false,
                        reason: '管理员账户不存在'
                    });
                }
                // 如果用户存在，返回盐
                return response.json({
                    success: true,
                    salt: adminObject.salt
                });
            });
        }
    },
    /**
     * 登录校验
     * @param  {object} connection 数据库连接
     * @param  {object} model      数据库模型
     */
    post: function(connection, model) {
        return function(request, response) {
            // 服务器日志
            Log.log(`post ${url}`);

            // 参数获取
            let username = request.query.username || null;
            let password = request.query.password || null;

            // 参数校验
            if (!username || !username.match(regexConfig.admin.username)
                || !password || !password.match(regexConfig.admin.passwordHash)) {
                return response.json({
                    success: false,
                    reason: '参数错误'
                });
            }

            // 看用户是否存在
            model.admin.one({ username: username, }, (err, adminObject) => {
                if (err) {
                    return response.json({
                        success: false,
                        reason: '服务器查询错误'
                    });
                }
                // 如果用户不存在
                if (!adminObject) {
                    return response.json({
                        success: false,
                        reason: '管理员账号不存在'
                    });
                }
                // 如果用户存在，则进行校验
                if (adminObject.password === password) {
                    // TODO session相关
                    return response.json({
                        success: true,
                        name: adminObject.name
                    });
                } else {
                    return response.json({
                        success: false,
                        reason: '用户名与密码不匹配'
                    });
                }
            });
        }
    }
};
