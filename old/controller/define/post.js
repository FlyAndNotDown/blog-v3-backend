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
    url: url
};
