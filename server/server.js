/**
 * /server/server.js
 * @author John Kindem
 */

const express = require('express');
const serverConfig = require('../config/server');
const Connector = require('../database/connector');

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
