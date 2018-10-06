/**
 * /tool/log.js
 * @author John Kindem
 */

/**
 * 辅助日志类
 */
class Log {

    /**
     * 记录型日志
     * @param {string} context 记录内容
     */
    static log(context) {
        console.log(`[log] ${context}`);
    }

    /**
     * 错误型日志
     * @param {string} context 记录内容
     */
    static error(context, error) {
        console.log(`[error] ${context}\n${error}`);
    }

}

module.exports = Log;
