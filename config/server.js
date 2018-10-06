/**
 * /config/server.js
 * @author John Kindem
 */

const settings = require('../settings');

/**
 * 服务器配置
 */
module.exports = settings.devMode ? {
    listenPort: 30000
} : {
    listenPort: 80
};
