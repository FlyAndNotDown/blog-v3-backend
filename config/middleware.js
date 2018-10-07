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
    },
    cors: {
        origin: 'http://localhost:20000',
        optionsSuccessStatus: 200
    }
} : {
    cookieParser: {
        signedSecret: 'kindem no.1'
    },
    cors: {
        origin: 'http://www.kindemh.cn',
        optionsSuccessStatus: 200
    }
};