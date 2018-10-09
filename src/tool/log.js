/**
 * /tool/log.js
 * @author John Kindem
 */

const config = require('../config');

const mainConfig = config.main;

/**
 * 日志类
 * @constructor
 */
class Log {

    /**
     * 记录生产日志
     * @param {string} context 内容
     * @param {string} detail 详情
     */
    static log(context, detail) {
        if (mainConfig.log) {
            console.log(`[log] ${context}${detail ? `\n${detail}` : ''}`);
        }
    }

    /**
     * 记录生产错误
     * @param {string} context 内容
     * @param {string} detail 详情
     */
    static error(context, detail) {
        if (mainConfig.log) {
            console.log(`[error] ${context}${detail ? `\n${detail}` : ''}`);
        }
    }

    /**
     * 记录开发日志
     * @param {string} context 内容
     * @param {string} detail 详情
     */
    static devLog(context, detail) {
        if (mainConfig.devMode && mainConfig.log) {
            console.log(`[log] ${context}${detail ? `\n${detail}` : ''}`);
        }
    }

    /**
     * 记录开发错误
     * @param {string} context 内容
     * @param {string} detail 详情
     */
    static devError(context, detail) {
        if (mainConfig.devMode && mainConfig.log) {
            console.log(`[error] ${context}${detail ? `\n${detail}` : ''}`);
        }
    }

}

module.exports = Log;