/**
 * /controller/defines/user/github.js
 * @author John Kindem
 * @description source file for //user/github controller
 * @version v1.0
 */

import controllerConfig from '../../../configs/controller';
import { Log } from '../../../tool/log';

/**
 * //user/github controller
 * @description {get} login API
 * @param {string} code github user code
 */
export default {
    url: `${controllerConfig.commonUrlPrefix}/user/github`,
    get: (database, models) => {
        return async (context, next) => {
            await next();

            // get params
            const query = context.request.query || {};
            const code = query.code || null;

            // check params
            if (!code) {
                Log.error('status 400', `code: ${code}`);
                return context.response.status = 400;
            }

            // TODO
        };
    }
};