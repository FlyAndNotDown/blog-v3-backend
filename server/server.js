const express = require('express');
const ModelFactory = require('../model/factory');
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

        this.__model.Post = ModelFactory.getInstance().getModel('post');
        // TODO add more

    }

    /**
     * 加载控制器
     */
    __loadContoller() {

        urlArray.forEach(url => {

            // RESTful API
            ControllerFactory.getInstance(this.__model, this.__server).when(url, 'get');
            ControllerFactory.getInstance(this.__model, this.__server).when(url, 'post');
            ControllerFactory.getInstance(this.__model, this.__server).when(url, 'put');
            ControllerFactory.getInstance(this.__model, this.__server).when(url, 'delete');

        });

    }

    /**
     * 开启服务器
     */
    start() {

        this.__server.listen(80);

    }

}
