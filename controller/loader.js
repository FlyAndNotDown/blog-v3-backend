/**
 * /controller/loader.js
 * @author John Kindem
 */

const controllerDefineArray = require('./define/index');

/**
 * 控制器加载器类
 * @constructor
 */
class ControllerLoader {

    /**
     * 构造
     * @param {Object} server 服务器对象
     * @param {Object} connection 连接对象
     * @param {Object} model 模型
     */
    constructor(server, connection, model) {
        this.__connection = connection;
        this.__model = model;

        // 根据列表依次加载 Controller
        controllerDefineArray.forEach(controllerDefine => {
            if (controllerDefine.get) {
                server.get(controllerDefine.url, controllerDefine.get(this.__connection, this.__model));
            }
            if (controllerDefine.post) {
                server.post(controllerDefine.url, controllerDefine.post(this.__connection, this.__model));
            }
            if (controllerDefine.put) {
                server.put(controllerDefine.url, controllerDefine.put(this.__connection, this.__model));
            }
            if (controllerDefine.delete) {
                server.delete(controllerDefine.url, controllerDefine.delete(this.__connection, this.__model));
            }
        });
    }

}

module.exports = ControllerLoader;
