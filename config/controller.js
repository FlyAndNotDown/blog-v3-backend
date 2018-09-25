/**
 * /config/controller.js
 * @author John Kindem
 */

const settings = require('../settings');

module.exports = settings.devMode ? {
    commonUrlPrefix: '/request/blog'
} : {
    commonUrlPrefix: '/request/blog'
};
