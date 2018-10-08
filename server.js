/**
 * /server.js
 * @author John Kindem
 */

const ModelLoader = require('./model/loader');
const ControllerLoader = require('./controller/loader');
const MiddlewareLoader = require('./middleware/loader');
const Sequelize = require('sequelize');
const config = require('./config');
const express = require('express');
const Log = require('./tool/log');

const modelConfig = config.model;
const serverConfig = config.server;
const connectionConfig = modelConfig.connection;

/**
 * 服务器类
 * @constructor
 */
class Server {

    /**
     * 构造
     */
    constructor() {
        this.__server = null;
        this.__models = null;
        this.__db = null;
    }

    /**
     * 初始化函数
     * @private
     */
    __init() {
        Log.log('开始初始化服务器');
        // 创建 express 对象
        this.__server = express();
        // 实例化 sequelize 对象
        this.__db = new Sequelize(
            connectionConfig.database,
            connectionConfig.username,
            connectionConfig.password,
            connectionConfig.options
        );
    }

    /**
     * 加载模型函数
     * @private
     */
    __loadModel() {
        Log.log('开始加载模型');
        this.__models = new ModelLoader(this.__db).getModels();
    }

    /**
     * 加载控制器函数
     * @private
     */
    __loadController() {
        Log.log('开始加载控制器');
        new ControllerLoader(this.__server, this.__models).load();
    }

    /**
     * 加载中间件函数
     * @private
     */
    __loadMiddleware() {
        Log.log('开始加载中间件');
        new MiddlewareLoader(this.__server).load();
    }

    /**
     * 开始监听
     * @private
     */
    __listen() {
        Log.log('开始监听端口');
        this.__server.listen(serverConfig.listenPort);
    }

    /**
     * 开启服务器
     */
    start() {
        this.__init();
        this.__loadModel();
        this.__loadController();
        this.__loadMiddleware();
        this.__listen();
        Log.log('服务器正在运行');
        return this;
    }

}

module.exports = Server;