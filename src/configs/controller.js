/**
 * /configs/controller.js
 * @author John Kindem
 * @description source file for controller configs
 * @version v1.0
 */

import mainConfig from './main';
import middlewareConfig from './middleware';
import path from 'path';

/**
 * export controller config
 */
export default {
    commonUrlPrefix: '/request/blog',
    index: {
        get: {
            maxAmount: 15
        }
    },
    fileUploadPath: path.join(middlewareConfig.static.staticPath, 'file')
};
