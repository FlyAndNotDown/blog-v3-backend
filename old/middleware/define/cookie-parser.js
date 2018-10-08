/**
 * /middleware/define/cookie-parser.js
 * @author John Kindem
 */

const cookieParser = require('cookie-parser');
const middlewareConfig = require('../../config/middleware');

const cookieParserConfig = middlewareConfig.cookieParser;

module.exports = cookieParser(cookieParserConfig.signedSecret);