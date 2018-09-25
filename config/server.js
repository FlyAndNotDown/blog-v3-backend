/**
 * /config/server.js
 * @author John Kindem
 */

const settings = require('../settings');

module.exports = settings.devMode ? {

    listenPort: 30000

} : {

    listenPort: 80

};
