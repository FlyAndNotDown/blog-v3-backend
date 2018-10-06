/**
 * /controller/define/post.js
 * @author John Kindem
 */

const controllerConfig = require('../../config/controller');

const url = `${controllerConfig.commonUrlPrefix}/post`;

module.exports = {
    url: url,

    /**
     * 获取文章
     * @param connection
     * @param model
     * @returns {Function}
     */
    get: function (connection, model) {
        return function (request, response) {
            // 服务器日志
            // TODO
        }
    }
};
