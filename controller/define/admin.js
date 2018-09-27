/**
 * /controller/define/admin.js
 * @author John Kindem
 */

const controllerConfig = require('../../config/controller');
const HttpError = require('../../tool/http-error');
const settings = require('../../settings');
const Log = require('../../tool/log');

module.exports = {
    url: `${controllerConfig.commonUrlPrefix}/admin`,
    // 获取盐
    get: function(connection, model) {
        return function(req, res) {
            // 控制台信息
            Log.log(`get ${controllerConfig.commonUrlPrefix}/admin`);
            // 参数校验
            let username = req.query.username || null;
            if (!username) {
                Log.log(`response 500`);
                return settings.devMode ? res.status(500).json(
                    HttpError.paramsError('need param: username')
                ) : res.status(500).end();
            }
            // 查询管理员用户是否存在
            model.admin.count({ username: username }, (err, count) => {
                if (err) {
                    Log.log(`response 500`);
                    return settings.devMode ? res.status(500).json(
                        HttpError.dbQueryError('db query error on model: admin')
                    ) : res.status(500).end();
                }
                // 如果管理员用户不存在
                if (count === 0) {
                    // 返回空盐
                    Log.log(`response 200`);
                    return res.json({
                        salt: null
                    });
                }
                // 如果存在则查询管理员用户的盐
                model.admin.one({ username: username }, (err, adminObject) => {
                    if (err) {
                        Log.log(`response 500`);
                        return settings.devMode ? res.status(500).json(
                            HttpError.dbQueryError('db query error on model: admin')
                        ) : res.status(500).end();
                    }
                    // 返回结果
                    Log.log(`response 200`);
                    return res.json({
                        salt: adminObject.salt
                    });
                });
            });
        }
    }
};
