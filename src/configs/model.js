/**
 * /configs/model.js
 * @author John Kindem
 * @description source file for model configs
 * @version v1.0
 */

import mainConfig from './main';

/**
 * export model config
 */
export default mainConfig.devMode ? {
    connection: {
        database: 'blog',
        username: 'development',
        password: 'development',
        options: {
            host: '134.175.59.165',
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            logging: false,
            operatorsAliases: false
        }
    }
} : {
    connection: {
        database: 'blog',
        username: 'development',
        password: 'development',
        options: {
            host: '134.175.59.165',
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            logging: false,
            operatorsAliases: false
        }
    }
};
