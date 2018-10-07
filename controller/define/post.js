/**
 * /controller/define/post.js
 * @author John Kindem
 */

const controllerConfig = require('../../config/controller');

const url = `${controllerConfig.commonUrlPrefix}/post`;

/**
 * /post 控制器配置
 */
module.exports = {
    url: url,

    /**
     * 获取文章
     * @param {Object} connection 连接对象
     * @param {Object} model 模型
     * @returns {Function} http处理函数
     */
    get: function (connection, model) {
        /**
         * @param {Object} request 请求对象
         * @param {Object} response 响应对象
         * @returns {*}
         */
        return function (request, response) {
            // TODO
        }
    }
};
