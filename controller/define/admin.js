/**
 * /controller/define/admin.js
 * @author John Kindem
 */

const controllerConfig = require('../../config/controller');
const HttpError = require('../../tool/http-error');
const settings = require('../../../settings');

module.exports = {
    url: `${controllerConfig.commonUrlPrefix}/admin`,
    // 获取盐
    get: function(connection, model) {
        return function(req, res) {
            // 参数校验
            let username = req.query.username || null;
            if (!username) {
                return settings.devMode ? res.status(500).json(
                    HttpError.paramsError('need param: username')
                ) : res.status(500).end();
            }
            // 查询管理员用户是否存在
            model.admin.count({ username: username }, (err, count) => {
                if (err) {
                    return settings.devMode ? res.status(500).json(
                        HttpError.dbQueryError('db query error on model: admin')
                    ) : res.status(500).end();
                }
                // 如果存在
                
            });
        }
    }
};
