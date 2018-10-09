/**
 * /config/controller.js
 * @author John Kindem
 */

const settings = require('../settings');

/**
 * 控制器配置
 */
module.exports = settings.devMode ? {
    commonUrlPrefix: '/request/blog'
} : {
    commonUrlPrefix: '/request/blog'
};
