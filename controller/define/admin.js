/**
 * /controller/define/admin.js
 * @author John Kindem
 */

const controllerConfig = require('../../config/controller');
const HttpError = require('../../tool/http-error');

module.exports = {
    url: `${controllerConfig.commonUrlPrefix}/admin`,
    // 获取盐
    get: function(connection, model) {
        return function(req, res) {
            // 参数校验
            let username = req.query.username || null;
            if (!username) {
                return res.status(500).json(
                    HttpError.paramsError('need param - username')
                );
            }
            
        }
    }
};
