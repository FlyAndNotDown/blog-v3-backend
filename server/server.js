/**
 * /server/server.js
 * @author John Kindem
 */

const express = require('express');
const serverConfig = require('../config/server');
const Connector = require('../database/connector');
const Model = require('../model/model');
const Log = require('../tool/log');
const ControllerLoader = require('../controller/loader');
const bodyParser = require('body-parser');

/**
 * 服务器类
 */
class Server {

    /**
     * 构造
     */
    constructor() {
        this.__server = null;
        this.__connection = null;
        this.__model = null;

        // 初始化
        this.__init();
        // 开启服务器
        this.__start();
    }

    /**
     * 加载中间件
     */
    __loadMiddwares() {
        // 使用 body-parser 中间件
        this.__server.use(bodyParser.json());
    }

    /**
     * 生成连接
     */
    __generateConnection() {
        // 获取连接
        this.__connection = Connector.getInstance().getConnection();
    }

    /**
     * 加载模型
     */
    __loadModel() {
        // 创建模型
        this.__model = new Model(this.__connection).getModel();
    }

    /**
     * 加载控制器
     */
    __loadController() {
        // 加载 Controller
        new ControllerLoader(this.__server, this.__connection, this.__server);
    }

    /**
     * 初始化
     */
    __init() {
        this.__server = express();
        // 加载中间件
        this.__loadMiddwares();
        // 生成连接
        this.__generateConnection();
        // 加载模型
        this.__loadModel();
        // 加载控制器
        this.__loadController();
    }

    /**
     * 开启服务器
     */
    __start() {
        // 开始监端口
        this.__server.listen(serverConfig.listenPort);
    }

}

module.exports = Server;
