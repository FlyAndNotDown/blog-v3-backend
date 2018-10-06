/**
 * /middleware/define/body-parser.js
 * @author John Kindem
 */

const bodyParser = require('body-parser');

/**
 * body 转 json 中间件
 */
module.exports = bodyParser.json();