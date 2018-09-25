const modelDefineArray = require('./index');
const Connection = require('../database/connection');

// 模型工厂
class ModelFactory {

    /**
     * 获取工厂单例
     * @return 工厂单例
     */
    static getInstance() {

        if (!ModelFactory.__instance) {
            ModelFactory.__instance = new ModelFactory();
        }
        return ModelFactory.__instance;

    }

    /**
     * 构造
     */
    constructor() {

        // 保存下来的已经定义过的模型
        this.__model = {};

        // 将所有模型定义先定义一遍
        modelDefineArray.forEach(modelDefine => {

            this.__model[modelDefine.name] = Connection.getInstance().getConnection().define(
                modelDefine.name,
                modelDefine.description,
                modelDefine.options || {}
            );

        });

    }

    /**
     * 获取模型
     *@return 模型
     */
    getModel(name) {

        return this.__model[name] || null;

    }

}

module.exports = ModelFactory;
