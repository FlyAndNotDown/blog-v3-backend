/**
 * /configs/middleware.js
 * @author John Kindem
 */

import mainConfig from './main';

/**
 * 导出中间件配置
 */
export default mainConfig.devMode ? {
    cookieParser: {
        signedSecret: 'kindem no.1'
    },
    cors: {
        origin: 'http://localhost:20000',
        optionsSuccessStatus: 200,
        credentials: true
    },
    session: {
        secret: 'kindem no.1',
        cookie: {
            maxAge: 1000 * 60
        },
        resave: true,
        saveUninitialized: true,
        fileStorePath: '../../storage/sessions'
    }
} : {};