/**
 * /middleware/defines/cors.js
 * @author John Kindem
 */

import cors from 'cors';
import middlewareConfig from '../../configs/middleware';

const corsConfig = middlewareConfig.cors;

export default cors(corsConfig);