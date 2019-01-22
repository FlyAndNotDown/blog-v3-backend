/**
 * /controller/defines/user/login.js
 * @author John Kindem
 * @description /${commonUrlPrefix}/user/login 控制器
 * @version v1.0
 */

import controllerConfig from '../../../configs/controller';
import { Log } from '../../../tool/log';

const { commonUrlPrefix } = controllerConfig;

/**
 * /${commonUrlPrefix}/user/login 控制器
 * @description {get} get login user info
 * * @param {'loginUser'} type type of get
 */
export default {
    url: `${controllerConfig.commonUrlPrefix}/user/login`,
    get: (db, model) => {
        return async (ctx, next) => {
            await next();

            // get type param
            const query = ctx.request.query || {};
            const type = query.type || null;

            // check the param
            if (!type) {
                Log.error('status 400', `type: ${type}`);
                return ctx.response.status = 400;
            }

            // do something due type
            switch (type) {
                case 'loginUser':
                    // TODO
                    break;
                default:
                    Log.error('status 400', `type: ${type}`);
                    return ctx.response.status = 400;
            }
        };
    }
};
