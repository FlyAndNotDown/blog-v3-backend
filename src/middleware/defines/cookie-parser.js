/**
 * /middleware/defines/cookie-parser.js
 * @author John Kindem
 */

import cookieParser from 'cookie-parser';
import middlewareConfig from '../../configs/middleware';

const cookieParserConfig = middlewareConfig.cookieParser;

/**
 * cookie 转换中间件
 */
export default cookieParser(cookieParser.signedSecret);