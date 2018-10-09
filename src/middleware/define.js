/**
 * /middleware/define.js
 * @author John Kindem
 */

import autoLog from './defines/auto-log';
import bodyParser from './defines/body-parser';
import cookieParser from './defines/cookie-parser';
import cors from './defines/cors';
import session from './defines/session';

export default [
    autoLog,
    bodyParser,
    cookieParser,
    cors,
    session
];