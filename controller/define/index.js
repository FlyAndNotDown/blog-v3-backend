/**
 * /controller/define/index.js
 * @author John Kindem
 */

const post = require('./post');

let controllerDefineArray = [];

(function() {
    controllerDefineArray.push(post);
})();

module.exports = controllerDefineArray;
