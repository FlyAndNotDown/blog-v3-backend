/**
 * /tool/http-error.js
 * @author John Kindem
 */

/**
 * Http错误工具类
 */
class HttpError {

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
            'paramsError',
            detail
        );
    }

    /**
     * 数据库查询错误
     * @param  {string} detail 错误详情
     * @return {object}        错误对象
     */
    static dbQueryError(detail) {
        return HttpError.__getErrorObject(
            'dbQueryError',
            detail
        );
    }

}

module.exports = HttpError;
