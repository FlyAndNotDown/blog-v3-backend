/**
 * /configs/middleware.js
 * @author John Kindem
 */

import mainConfig from './main';

/**
 * 导出中间件配置
 */
export default mainConfig.devMode ? {
    cors: {
        origin: 'http://localhost:20000',
        credentials: true
    },
    session: {
        key: 'kindem',
        httpOnly: false,
        overwrite: true
    }
} : {};