/**
 * /middleware/define/session.js
 * @author John Kindem
 */

const session = require('express-session');
const FileStore = require('session-file-store')(session);
const middlewareConfig = require('../../config/middleware');

const sessionConfig = middlewareConfig.session;

module.exports = session({
    store: new FileStore(),
    secret: sessionConfig.secret,
    cookie: sessionConfig.cookie,
    resave: sessionConfig.resave,
    saveUninitialized: sessionConfig.saveUninitialized
});