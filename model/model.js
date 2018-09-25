/**
 * /model/model.js
 * @author John Kindem
 */

const modelDefineArray = require('./define/index');

/**
 * 模型类
 */
class Model {

    /**
     * 构造
     */
    constructor(connection) {
        this.__connection = connection;
        // 根据定义生成模型对象
        this.__model = {};

        // 初始化
        this.__init();
    }

    __init() {
        // 根据列表进行定义，并且将模型对象存入 this.__model
        modelDefineArray.forEach(modelDefine => {
            this.__model[modelDefine.name] = this.__connection.define(
                modelDefine.name,
                modelDefine.description,
                modelDefine.method || {}
            );
        });
    }

    /**
     * 获取模型对象
     * @return {object} 模型对象
     */
    getModel() {
        return this.__model;
    }

}

module.exports = Model;
