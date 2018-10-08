/**
 * /controller/loader.js
 * @author John Kindem
 */

const controllerDefineList = require('./define');

/**
 * 控制器加载器
 * @constructor
 */
class ControllerLoader {

    /**
     * 构造
     * @param {{}} server 服务器对象
     * @param {{}} models 模型对象
     */
    constructor(server, models, db) {
        this.__server = server;
        this.__models = models;
        this.__db = db;
    }

    /**
     * 加载控制器
     */
    load() {
        controllerDefineList.forEach((controller) => {
            if (controller.get) {
                this.__server.get(controller.url, controller.get(this.__db, this.__models));
            }
            if (controller.post) {
                this.__server.post(controller.url, controller.post(this.__db, this.__models));
            }
            if (controller.put) {
                this.__server.put(controller.url, controller.put(this.__db, this.__models));
            }
            if (controller.delete) {
                this.__server.delete(controller.url, controller.delete(this.__db, this.__models));
            }
        });
    }

}

module.exports = ControllerLoader;