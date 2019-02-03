/**
 * /configs/server.js
 * @author John Kindem
 * @description source file for server configs
 */

import mainConfig from './main';
import KeyGrip from 'keygrip';

/**
 * export server config
 */
export default mainConfig.devMode ? {
    listenPort: 30000,
    keys: new KeyGrip(['Kindem\'s Blog'], 'sha256')
} : {
    listenPort: 30000,
    keys: new KeyGrip(['Kindem\'s Blog'], 'sha256')
};
