/**
 * /config.js
 * @author John Kindem
 */

const mainConfig = require('./configs/main');
const serverConfig = require('./configs/server');
const modelConfig = require('./configs/model');
const controllerConfig = require('./configs/controller');
const middlewareConfig = require('./configs/middleware');

/**
 * 导出总配置
 */
module.exports = {
    main: mainConfig,
    server: serverConfig,
    model: modelConfig,
    controller: controllerConfig,
    middleware: middlewareConfig
};