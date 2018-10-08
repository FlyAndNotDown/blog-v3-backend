/**
 * /middleware/loader.js
 * @author John Kindem
 */

const middlewareDefineArray = require('./define/index');

/**
 * 中间件加载器类
 * @constructor
 */
class MiddlewareLoader {

    /**
     * 构造
     * @param {Object} server 服务器对象
     */
    constructor(server) {
        this.__server = server;

        this.loadMiddlewares();
    }

    /**
     * 加载中间件
     */
    loadMiddlewares() {
        middlewareDefineArray.forEach(middleware => {
            this.__server.use(middleware);
        });
    }

}

module.exports = MiddlewareLoader;