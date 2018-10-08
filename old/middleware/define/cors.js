/**
 * /middleware/define/cors.js
 * @author John Kindem
 */

const cors = require('cors');
const middlewareConfig = require('../../config/middleware');

const corsConfig = middlewareConfig.cors;

module.exports = cors(corsConfig);