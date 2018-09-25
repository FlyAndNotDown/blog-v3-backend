/**
 * /config/database.js
 * @author John Kindem
 */

const settings = require('../settings');

module.exports = settings.devMode ? {
    connection: {
        driver: 'mysql',
        url: '134.175.59.165',
        port: '3306',
        database: 'blog',
        username: 'development',
        password: 'development'
    }
} : {
    connection: {
        driver: 'mysql',
        url: 'localhost',
        port: '3306',
        database: 'blog',
        username: 'development',
        password: 'development'
    }
};
