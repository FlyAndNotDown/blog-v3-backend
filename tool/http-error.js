/**
 * /tool/http-error.js
 * @author John Kindem
 */

/**
 * Http错误工具类
 */
class HttpError {

    static TYPE_PARAMS_ERROR = 'paramsError';

    /**
     * 获取错误对象
     * @param  {string} type   错误类型
     * @param  {string} detail 错误详情
     * @return {object}        错误对象
     */
    static __getErrorObject(type, detail) {
        return {
            type: type,
            detail: detail
        };
    }

    /**
     * 参数错误
     * @param  {string} detail 错误详情
     * @return {object}        错误对象
     */
    static paramsError(detail) {
        return HttpError.__getErrorObject(
            HttpError.TYPE_PARAMS_ERROR,
            detail
        )
    }

}

module.exports = HttpError;
