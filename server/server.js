/**
 * /server/server.js
 * @author John Kindem
 */

const express = require('express');
const serverConfig = require('../config/server');

/**
 * 服务器类
 */
class Server {

    /**
     * 构造
     */
    constructor() {

        this.__server = express();

        // 开启服务器
        this.__start();

    }

    /**
     * 开启服务器
     */
    __start() {

        this.__server.listen(serverConfig.listenPort);

    }

}

module.exports = Server;
