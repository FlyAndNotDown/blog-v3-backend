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