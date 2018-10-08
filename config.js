/**
 * /config.js
 * @author John Kindem
 */

/**
 * 主配置
 */
const mainConfig = {
    devMode: true,
    log: true
};

/**
 * 服务器配置
 */
const serverConfig = mainConfig.devMode ? {
    listenPort: 30000
} : {};

/**
 * 模型层配置
 */
const modelConfig = mainConfig.devMode ? {
    connection: {
        database: 'blog',
        username: 'development',
        password: 'development',
        options: {
            host: '134.175.59.165',
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            logging: false,
            operatorsAliases: false
        }
    }
} : {};

/**
 * 控制器层配置
 */
const controllerConfig = mainConfig.devMode ? {
    commonUrlPrefix: '/request/blog'
} : {};

/**
 * 中间件层配置
 */
const middlewareConfig = mainConfig.devMode ? {

} : {};

/**
 * 正则表达式配置
 */
const regexConfig = mainConfig.devMode ? {

} : {};

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