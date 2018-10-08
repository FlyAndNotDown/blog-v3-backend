/**
 * /configs/server.js
 * @author John Kindem
 */

const mainConfig = require('./main');

/**
 * 导出服务器配置
 */
module.exports = mainConfig.devMode ? {
    listenPort: 30000
} : {};