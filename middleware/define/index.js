/**
 * /middleware/define/index.js
 * @author John Kindem
 */

const bodyParser = require('./body-parser');
const log = require('./log');

let middlewareDefineArray = [];

(function () {
    middlewareDefineArray.push(log);
    middlewareDefineArray.push(bodyParser);
}());

module.exports = middlewareDefineArray;