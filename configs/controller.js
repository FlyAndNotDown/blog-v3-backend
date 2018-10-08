/**
 * /configs/controller.js
 * @author John Kindem
 */

const mainConfig = require('./main');

/**
 * 导出控制器配置
 */
module.exports = mainConfig.devMode ? {
    commonUrlPrefix: '/request/blog'
} : {};