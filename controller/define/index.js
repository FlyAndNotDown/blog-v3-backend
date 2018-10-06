/**
 * /controller/define/index.js
 * @author John Kindem
 */

const post = require('./post');
const home = require('./home');
const admin = require('./admin');

let controllerDefineArray = [];

(function() {
    controllerDefineArray.push(post);
    controllerDefineArray.push(home);
    controllerDefineArray.push(admin);
})();

/**
 * 控制器数组
 */
module.exports = controllerDefineArray;
