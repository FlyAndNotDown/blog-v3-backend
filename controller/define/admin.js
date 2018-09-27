/**
 * /controller/define/admin.js
 * @author John Kindem
 */

const controllerConfig = require('../../config/controller');

module.exports = {
    url: `${controllerConfig.commonUrlPrefix}/admin`,
    // 获取盐
    get: function(connection, model) {
        return function(req, res) {
            
        }
    }
};
