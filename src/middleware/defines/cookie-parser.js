/**
 * /middleware/defines/cookie-parser.js
 * @author John Kindem
 */

import cookieParser from 'cookie-parser';
import middlewareConfig from '../../configs/middleware';

/**
 * cookie 转换中间件
 */
export default cookieParser(middlewareConfig.signedSecret);