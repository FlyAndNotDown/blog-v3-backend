/**
 * /controller/define/index.js
 * @author John Kindem
 */

const post = require('./post');
const home = require('./home');
const adminGeneral = require('./admin/general');
const adminLogin = require('./admin/login');

let controllerDefineArray = [];

(function() {
    controllerDefineArray.push(post);
    controllerDefineArray.push(home);
    controllerDefineArray.push(adminGeneral);
    controllerDefineArray.push(adminLogin);
})();

/**
 * 控制器数组
 */
module.exports = controllerDefineArray;
