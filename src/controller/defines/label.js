/**
 * /controller/defines/label.js
 * @author John Kindem
 * @description source file for //label controller
 * @version v1.0
 */

import controllerConfig from '../../configs/controller';
import { Log } from '../../tool/log';

/**
 * //label controller
 * @description {get} get all labels
 * @param {'all'} type get type
 * 
 * @description {get} get some labels
 * @param {'some'} type get type
 * @todo
 */
export default {
    url: `${controllerConfig.commonUrlPrefix}/label`,
    get: (db, models) => {
        return async (ctx, next) => {
            await next();

            // get params
            const query = ctx.request.query || {};
            const type = query.type || null;

            // params check
            if (!type) {
                Log.error('status 400', `type: ${type}`);
                ctx.response.status = 400;
                return null;
            }

            // do different thing when get different type
            switch (type) {
                case 'all':
                    // query databse
                    let labels = null;
                    try {
                        labels = await models.label.findAll();
                    } catch (e) {
                        Log.error('status 500', e);
                        ctx.response.status = 500;
                        return null;
                    }

                    // return result
                    let result = [];
                    labels.forEach(label => result.push({
                        id: label.id,
                        name: label.name
                    }));
                    ctx.response.body = {
                        labels: result
                    };
                    return null;
                case 'some':
                    // TODO
                    return null;
                default:
                    Log.error('status 400', `type ${type}`);
                    ctx.response.status = 400;
                    return null;
            }
        };
    }
}
