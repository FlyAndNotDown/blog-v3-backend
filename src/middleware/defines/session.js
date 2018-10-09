/**
 * /middleware/defines/session.js
 * @author John Kindem
 */

import session from 'express-session';
import fileStoreGenerator from 'session-file-store';
import middlewareConfig from '../../configs/middleware';

const FileStore = fileStoreGenerator(session);

const sessionConfig = middlewareConfig.session;

/**
 * session 处理中间件
 */
export default session({
    store: new FileStore({
        path: sessionConfig.fileStorePath
    }),
    secret: sessionConfig.secret,
    cookie: sessionConfig.cookie,
    resave: sessionConfig.resave,
    saveUninitialized: sessionConfig.saveUninitialized
});