/**
 * /configs/middleware.js
 * @author John Kindem
 * @description source file for middleware config
 * @version v1.0
 */

import mainConfig from './main';
import path from 'path';

/**
 * export middleware config
 */
export default mainConfig.devMode ? {
    cors: {
        origin: 'http://localhost:20000',
        credentials: true
    },
    session: {
        key: 'sessionid',
        maxAge: 1000 * 60 * 60 * 24 * 7,
        autoCommit: true,
        overwrite: true,
        httpOnly: true,
        signed: true,
        rolling: false,
        renew: false
    },
    static: {
        staticPath: path.join(__dirname, '../../../public')
    }
} : {
    cors: {
        origin: 'http://134.175.59.165',
        credentials: true
    },
    session: {
        key: 'sessionid',
        maxAge: 1000 * 60 * 60 * 24 * 7,
        autoCommit: true,
        overwrite: true,
        httpOnly: true,
        signed: true,
        rolling: false,
        renew: false
    },
    static: {
        staticPath: path.join(__dirname, '../../../public')
    }
};
