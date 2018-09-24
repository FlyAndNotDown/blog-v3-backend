const post = require('./func/post');

// 控制器工厂单例类
class ControllerFactory {

    /**
     * 获取单例
     * @return 控制器工厂单例
     */
    static getInstance(model) {

        if (!ControllerFactory.__instance) {
            ControllerFactory.__instance = new ControllerFactory(model);
        }
        return ControllerFactory.__instance;

    }

    /**
     * 构造
     */
    constructor(model) {

        this.__connection = connection;
        this.__model = model;

    }

    /**
     * 将 url/method 与 func 的对应关系添加到 express 中
     */
    when(url, method) {

        switch (url) {
            case '/post':
                post(this.__model, url, method);
                break;
            default:
                break;
        }

    }

}

module.exports = ControllerFactory;
