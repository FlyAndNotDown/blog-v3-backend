const express = require('express');
const ModelFactory = require('../model/factory');
const modelDefineArray = require('../model/index');
const ControllerFactory = require('../controller/factory');
const urlArray = require('../controller/url');

// 服务器类
class Server {

    /**
     * 构造
     */
    constructor() {

        // 新建服务器
        this.__server = express();
        // 初始化
        this.__init();
        // 加载 model
        this.__loadModel();
        // 加载 controller
        this.__loadContoller();

        this.__model = {};

    }

    /**
     * 初始化
     */
    __init() {



    }

    /**
     * 加载模型
     */
    __loadModel() {

        modelDefineArray.forEach(modelDefine => {

            this.__model[modelDefine.name] = ModelFactory.getInstance().getModel(modelDefine.name);

        });

    }

    /**
     * 加载控制器
     */
    __loadContoller() {

        urlArray.forEach(url => {

            // RESTful API
            ControllerFactory.getInstance(this.__model, this.__server).when(url);

        });

    }

    /**
     * 开启服务器
     */
    start() {

        this.__server.listen(80);

    }

}

module.exports = Server;
