/**
 * /server.js
 * @author John Kindem
 * @description server class
 * @version v1.1
 * 
 * ------------------------------
 * modified at 2019-2-3
 * version 1.1
 * 1 - some refactor about jsdoc
 * ------------------------------
 */

import { ModelLoader } from "./model/loader";
import { ControllerLoader } from "./controller/loader";
import { MiddlewareLoader } from "./middleware/loader";
import Sequelize from 'sequelize';
import Koa from 'koa';
import routerGenerator from 'koa-router';
import { Log } from "./tool/log";
import modelConfig from './configs/model';
import serverConfig from './configs/server';

const connectionConfig = modelConfig.connection;

/**
 * server class
 * @constructor
 */
export class Server {

    /**
     * constructor
     */
    constructor() {
        this.__server = null;
        this.__models = null;
        this.__db = null;
        this.__router = null;
    }

    /**
     * init function
     * @private
     */
    __init() {
        Log.log('server inited.');
        // create Koa object
        this.__server = new Koa();
        // set keys of server
        this.__server.keys = serverConfig.keys;
        // create router
        this.__router = routerGenerator();
        // instantiate new Sequelize object
        this.__db = new Sequelize(
            connectionConfig.database,
            connectionConfig.username,
            connectionConfig.password,
            connectionConfig.options
        );
    }

    /**
     * load model function
     * @private
     */
    __loadModel() {
        Log.log('models loaded.');
        this.__models = new ModelLoader(this.__db).getModels();
    }

    /**
     * load controller function
     * @private
     */
    __loadController() {
        Log.log('controllers loaded.');
        new ControllerLoader(this.__router, this.__models, this.__db).load();
        // 使用路由
        this.__server.use(this.__router.routes());
    }

    /**
     * load middlewares function
     * @private
     */
    __loadMiddleware() {
        Log.log('middlewares loaded.');
        new MiddlewareLoader(this.__server).load();
    }

    /**
     * start port listen
     * @private
     */
    __listen() {
        Log.log('port listening ...');
        this.__server.listen(serverConfig.listenPort);
    }

    /**
     * start server function
     */
    start() {
        this.__init();
        this.__loadModel();
        this.__loadMiddleware();
        this.__loadController();
        this.__listen();
        Log.log('server is running ...');
        return this;
    }

}
