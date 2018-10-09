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
    }
} : {};