/**
 * /middleware/define.js
 * @author John Kindem
 */

import autoLog from './defines/auto-log';
import bodyParser from './defines/body-parser';
import cors from './defines/cors';
import session from './defines/session';
import statics from './defines/static';

export default [
    autoLog,
    bodyParser,
    session,
    cors,
    statics
];