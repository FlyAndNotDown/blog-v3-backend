/**
 * /configs/server.js
 * @author John Kindem
 */

import mainConfig from './main';

/**
 * 导出服务器配置
 */
export default mainConfig.devMode ? {
    listenPort: 30000
} : {};