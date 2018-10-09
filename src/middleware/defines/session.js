/**
 * /middleware/defines/session.js
 * @author John Kindem
 */

import session from 'express-session';
import middlewareConfig from '../../configs/middleware';

const sessionConfig = middlewareConfig.session;

/**
 * session 处理中间件
 */
export default session({
    secret: sessionConfig.secret,
    cookie: sessionConfig.cookie,
    resave: sessionConfig.resave,
    saveUninitialized: sessionConfig.saveUninitialized
});