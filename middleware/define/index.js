/**
 * /middleware/define/index.js
 * @author John Kindem
 */

const bodyParser = require('./body-parser');
const cookieParser = require('./cookie-parser');
const cors = require('./cors');
const autoLog = require('./auto-log');

let middlewareDefineArray = [];

(function () {
    middlewareDefineArray.push(autoLog);
    middlewareDefineArray.push(cors);
    middlewareDefineArray.push(cookieParser);
    middlewareDefineArray.push(bodyParser);
}());

module.exports = middlewareDefineArray;