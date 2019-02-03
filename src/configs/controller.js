/**
 * /configs/controller.js
 * @author John Kindem
 * @description source file for controller configs
 * @version v1.0
 */

import mainConfig from './main';

/**
 * export controller config
 */
export default mainConfig.devMode ? {
    commonUrlPrefix: '/request/blog',
    index: {
        get: {
            maxAmount: 15
        }
    }
} : {
    commonUrlPrefix: '/request/blog',
    index: {
        get: {
            maxAmount: 15
        }
    }
};
