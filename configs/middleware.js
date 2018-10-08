/**
 * /configs/middleware.js
 * @author John Kindem
 */

const mainConfig = require('./main');

/**
 * 导出中间件配置
 */
module.exports = mainConfig.devMode ? {

} : {};