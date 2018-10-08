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
            }
        }
    }
} : {};

/**
 * 控制器层配置
 */
const controllerConfig = mainConfig.devMode ? {

} : {};

/**
 * 视图层配置
 */
const viewConfig = mainConfig.devMode ? {
    commonUrlPrefix: '/request/blog'
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
    model: modelConfig,
    controller: controllerConfig,
    view: viewConfig
};