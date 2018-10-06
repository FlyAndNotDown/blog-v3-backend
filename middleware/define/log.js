/**
 * /middleware/define/log.js
 * @author John Kindem
 */

const Log = require('../../tool/log');

/**
 * 服务器日志中间件
 * @param request
 * @param response
 * @param next
 */
module.exports = function (request, response, next) {
    // 记录日志
    Log.log(`${request.method.toLowerCase()} ${request.url}`);

    // 跳转到下一个中间件
    next();
};