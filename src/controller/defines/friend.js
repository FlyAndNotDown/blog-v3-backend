/**
 * /controller/defines/friend.js
 * @author John Kindem
 * @description source file for //friend controller
 * @version v1.0
 */

import controllerConfig from '../../configs/controller';
import { Log } from '../../tool/log';

/**
 * //friend controller
 * @description {get} get all friend chain info
 * 
 * @description {post} generate a new friend chain info
 * @param {string} name name of friend chain
 * @param {string} to link destination of friend chain
 */
export default {
    url: `${controllerConfig.commonUrlPrefix}/friend`,
    get: (database, models) => {
        return async (context, next) => {
            await next();

            // quert database to get info
            let friends = [];
            try {
                friends = await models.friend.findAll();
            } catch (e) {
                Log.error('status 500', e);
                return context.response.status = 500;
            }

            // ready result list
            let result = [];
            for (let i = 0; i < friends.length; i++) {
                result.push({
                    id: friends[i].id,
                    name: friends[i].name,
                    to: friends[i].to
                });
            }

            // return result
            return context.response.body = {
                friends: result
            };
        };
    },
    post: (database, models) => {}
};