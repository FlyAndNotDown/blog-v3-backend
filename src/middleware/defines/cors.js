/**
 * /middleware/defines/cors.js
 * @author John Kindem
 */

import cors from 'cors';
import middlewareConfig from '../../configs/middleware';

const corsConfig = middlewareConfig.cors;

/**
 * CORS 跨域认证中间件
 */
export default cors(corsConfig);