const express = require('express');
const ModelFactory = require('../model/factory');

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

        

    }

    /**
     * 开启服务器
     */
    start() {

        this.__server.listen(80);

    }

}
