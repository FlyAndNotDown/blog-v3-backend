/**
 * /controller/define/index.js
 * @author John Kindem
 */

const post = require('./post');
const home = require('./home');

let controllerDefineArray = [];

(function() {
    controllerDefineArray.push(post);
    controllerDefineArray.push(home);
})();

module.exports = controllerDefineArray;
