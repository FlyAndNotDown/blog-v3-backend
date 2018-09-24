const modelDefineArray = require('./index');

// 模型工厂
class Factory {

    /**
     * 获取工厂单例
     * @return 工厂单例
     */
    static getInstance(connection) {

        if (!Factory.__instance) {
            Factory.__instance = new Factory(connection);
        }
        return Factory.__instance;

    }

    /**
     * 构造
     */
    constructor(connection) {

        // 保存下来的已经定义过的模型
        this.__model = {};

        // 将所有模型定义先定义一遍
        modelDefineArray.forEach(modelDefine => {

            this.__model[modelDefine.name] = connection.define(
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
