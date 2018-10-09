/**
 * /middleware/defines/session.js
 * @author John Kindem
 */

import session from 'koa-session';
import middlewareConfig from '../../configs/middleware';

const sessionConfig = middlewareConfig.session;

/**
 * session 处理中间件
 */
export default (server) => {
    return session(sessionConfig, server);
};