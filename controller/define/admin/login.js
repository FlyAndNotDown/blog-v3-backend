/**
 * /controller/define/admin/login.js
 * @author John Kindem
 */

const controllerConfig = require('../../../config/controller');
const Log = require('../../../tool/log');
const regexConfig = require('../../../config/regex');

const adminRegex = regexConfig.admin;
const url = `${controllerConfig.commonUrlPrefix}/admin/login`;

/**
 * /admin/login 控制器定义
 */
module.exports = {
    url: url,
    get: function (connection, model) {
        return function (request, response) {
            // 获取参数
            const query = request.query || {};
            const type = query.type || null;
            const username = query.username || null;

            // 参数校验
            if (!type) {
                Log.error('参数校验错误', `type: ${type}`);
                return response.status(400).send('参数校验错误');
            }

            // 根据 get 的类型进行处理
            switch (type) {
                case 'salt':
                    // 如果是获取盐
                    // 参数校验
                    if (!username || !username.match(adminRegex.username)) {
                        Log.error('参数校验错误', `username: ${username}`);
                        return response.status(400).send('参数校验错误');
                    }
                    // 查询 username 是否存在
                    model.admin.one({
                        username: username
                    }, (error, object) => {
                        // 如果查询出错
                        if (error) {
                            Log.error('数据库查询错误', error);
                            return response.status(500).send('数据库查询错误');
                        }
                        // 如果存在
                        if (object) {
                            return response.json({
                                salt: object.salt
                            });
                        } else {
                            return response.json({
                                salt: null
                            });
                        }
                    });
                    break;
                case 'info':
                    // 如果是获取登录情况
                    // 查询 session 看是否已经登录
                    const adminLoginStatus = !!request.session.adminLoginStatus;
                    const adminLoginInfo = request.session.adminLoginInfo || null;
                    return response.json({
                        status: adminLoginStatus,
                        info: adminLoginInfo
                    });
                default:
                    Log.error('参数校验错误', `type: ${type}`);
                    return response.status(400).send('参数校验错误');
            }
        }
    },
    post: function (connection, model) {
        return function (request, response) {
            // 获取参数
            const body = request.body || {};
            const username = body.username || null;
            const password = body.password || null;

            // 参数校验
            if (!username || !username.match(adminRegex.username)) {
                Log.error('参数校验错误', `username: ${username}`);
                return response.status(400).send('参数校验错误');
            }
            if (!password || !password.match(adminRegex.passwordHash)) {
                Log.error('参数校验错误', `password: ${password}`);
                return response.status(400).send('参数校验错误');
            }

            // 查询数据库获取管理员对象
            model.admin.one({
                username: username,
                password: password
            }, (error, object) => {
                // 如果查询出错
                if (error) {
                    Log.error('数据库查询错误', error);
                    return response.status(500).send('数据库查询错误');
                }
                // 如果存在
                if (object) {
                    // 密码校验
                    if (object.password === password) {
                        // 如果校验成功
                        // 在 session 中保存登录状态
                        request.session.adminLoginStatus = true;
                        request.session.adminLoginInfo = {
                            id: object.id,
                            name: object.name,
                            username: object.username,
                            phone: object.phone
                        };

                        // 返回登录结果
                        return response.json({
                            success: true
                        });
                    } else {
                        return response.json({
                            success: false
                        });
                    }
                } else {
                    return response.json({
                        success: false
                    });
                }
            });
        }
    }
};