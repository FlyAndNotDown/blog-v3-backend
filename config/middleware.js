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
    },
    session: {
        secret: 'kindem no.1',
        cookie: {
            maxAge: 1000 * 60
        },
        resave: false,
        saveUninitialized: false
    }
} : {
    cookieParser: {
        signedSecret: 'kindem no.1'
    },
    cors: {
        origin: 'http://www.kindemh.cn',
        optionsSuccessStatus: 200
    },
    session: {
        secret: 'kindem no.1',
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7
        },
        resave: false,
        saveUninitialized: false
    }
};