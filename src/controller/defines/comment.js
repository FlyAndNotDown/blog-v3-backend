/**
 * /controller/defines/comment.js
 * @author John Kindem
 * @description source file for //comment controller
 * @version v1.0
 */

import controllerConfig from '../../configs/controller';
import regexConfig from '../../configs/regex';
import { Log } from '../../tool/log';

const normalRegex = regexConfig.normal;

/**
 * //comment controller
 * @description {get} get all comments in a post
 * @param {'post'} type get type
 * @param {string} postId post id
 */
export default {
    url: `${controllerConfig.commonUrlPrefix}/comment`,
    get: (database, models) => {
        return async (context, next) => {
            await next();

            // get params
            const query = context.request.query || {};
            const type = query.type || null;

            // param check
            if (!type) {
                Log.error('status 400', `type: ${type}`);
                return context.response.status = 400;
            }

            // do different thing when get different type
            switch (type) {
                case 'post':
                    // get params
                    const postId = query.postId || null;

                    // check params
                    if (!postId || !postId.match(normalRegex.naturalNumber)) {
                        Log.error('status 400', `postId: ${postId}`);
                        return context.response.status = 400;
                    }

                    // query database to get all comment in a post
                    let post;
                    try {
                        post = await models.post.findOne({
                            where: {
                                id: postId
                            }
                        });
                    } catch (e) {
                        Log.error('status 500', e);
                        return context.response.status = 500;
                    }

                    // if got nothing
                    if (!post) {
                        return context.response.body = {
                            comments: []
                        };
                    }

                    // if got a post object, get all comments in this post
                    let comments = await post.getComments();

                    // result list
                    let result = [];

                    // TODO ready result list

                    // return result
                    return context.response.body = {
                        comments: result
                    };
                default:
                    Log.error('status 400', `type: ${type}`);
                    return context.response.status = 400;
            }
        };
    }
};