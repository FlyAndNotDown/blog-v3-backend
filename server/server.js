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
     * 初始化
     */
    __init() {
        this.__server = express();
        // 获取连接
        this.__connection = Connector.getInstance().getConnection();
        // 创建模型
        this.__model = new Model(this.__connection).getModel();
        // 加载 Controller
        new ControllerLoader(this.__server, this.__connection, this.__server);
    }

    /**
     * 开启服务器
     */
    __start() {
        // 开始监端口
        this.__server.listen(serverConfig.listenPort);
    }

    /**
     * 更新模型
     */
    static updateModel() {
        let connection = Connector.getInstance().getConnection();
        let model = new Model(connection);
        connection.sync((err) => {
            if (err) {
                Log.error('更新模型失败', err);
                process.exit(0);
            }
            Log.log('更新模型成功');
            process.exit(0);
        });
    }

}

module.exports = Server;
