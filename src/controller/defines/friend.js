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
 * @param {string} description description of friend chain
 */
export default {
    url: `${controllerConfig.commonUrlPrefix}/friend`,
    get: (database, models) => {
        return async (context, next) => {
            await next();

            // query database to get info
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
                    to: friends[i].to,
                    description: friends[i].description
                });
            }

            // return result
            return context.response.body = {
                friends: result
            };
        };
    },
    post: (database, models) => {
        return async (context, next) => {
            await next();

            // get params
            const body = context.request.body || {};
            const name = body.name || null;
            const to = body.to || null;
            const description = body.description || null;

            // check params
            if (!name) {
                Log.error('status 400', `name: ${name}`);
                return context.response.status = 400;
            }
            if (!to) {
                Log.error('status 400', `to: ${to}`);
                return context.response.status = 400;
            }
            if (!description) {
                Log.error('status 400', `description: ${description}`);
                return context.response.status = 400;
            }

            // check admin login status
            if (!context.session.adminLogin || !context.session.adminInfo) {
                Log.error('status 400', `admin not login or fake admin info`);
                return context.response.status = 400;
            }

            // create new object in database
            try {
                await models.friend.create({
                    name: name,
                    to: to,
                    description: description
                });
            } catch (e) {
                Log.error('status 500', e);
                return context.response.status = 500;
            }

            // return result
            return context.response.body = {
                success: true
            };
        };
    }
};