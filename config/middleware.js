/**
 * /config/middleware.js
 * @author John Kindem
 */

const settings = require('../settings');

/**
 * 中间件配置
 */
module.exports = settings.devMode ? {
    cookieParser: {
        signedSecret: 'kindem no.1'
    }
} : {
    cookieParser: {
        signedSecret: 'kindem no.1'
    }
};