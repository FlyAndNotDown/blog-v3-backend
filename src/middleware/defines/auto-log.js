/**
 * /middleware/defines/auto-log.js
 * @author John Kindem
 */

/**
 * 服务器自动日志中间件
 */
export default function (request, response, next) {
    // 记录请求日志
    Log.log(`${request.method.toLowerCase()} ${request.url.split('?')[0]}`);

    // 跳转到下一个中间件
    next();
};