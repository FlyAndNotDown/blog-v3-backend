/**
 * /config/script.js
 * @author John Kindem
 */

const settings = require('../settings');

module.exports = settings.devMode ? {
    adminRegex: {
        username: /[0-9a-z]{6,16}/,
        password: /[0-9a-z@#]{6,16}/,
        name: /[0-9a-z]{6,16}/
    }
} : {
    adminRegex: {
        username: /[0-9a-z]{6,16}/,
        password: /[0-9a-z@#]{6,16}/,
        name: /[0-9a-z]{6,16}/
    }
};
