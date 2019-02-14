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
 * 
 * @description {post} publish a new comment
 * @param {'comment'} type post type
 * @param {string} postId post id
 * @param {string} body comment body
 * 
 * @description {post} publish a new reply
 * @param {'reply'} type post type
 * @param {string} postId post id
 * @param {string} parentId parent comment id
 * @param {string} mentionId mention user id
 * @param {string} body comment body
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
                    let result = [], childrenComments = [], parentComments = [];

                    // split two type of comments
                    for (let i = 0; i < comments.length; i++) {
                        if (comments[i].isChild) {
                            childrenComments.push(comments[i]);
                        } else {
                            parentComments.push(comments[i]);
                        }
                    }

                    // ready result list
                    for (let i = 0; i < parentComments.length; i++) {
                        // ready creator & mention user
                        let creator = parentComments[i].getCreators()[0] || null;
                        let mention = parentComments[i].getMentions()[0] || null;
                        
                        // ready children
                        let children = [];
                        for (let j = 0; j < childrenComments.length; j++) {
                            if (childrenComments[j].parent === parentComments[i].id) {
                                children.push(childrenComments[j]);
                            }
                        }
                        
                        // push to result list
                        result.push({
                            id: parentComments[i].id,
                            body: parentComments[i].body,
                            datetime: parentComments[i].createdAt,
                            creator: creator && {
                                id: creator.id,
                                type: creator.type,
                                key: creator.key,
                                nickname: creator.nickname,
                                avatar: creator.avatar,
                                email: creator.email
                            },
                            mention: mention && {
                                id: mention.id,
                                type: mention.type,
                                key: mention.key,
                                nickname: mention.nickname,
                                avatar: mention.avatar,
                                email: mention.email
                            },
                            children: children
                        });
                    }

                    // return result
                    return context.response.body = {
                        comments: result
                    };
                default:
                    Log.error('status 400', `type: ${type}`);
                    return context.response.status = 400;
            }
        };
    },
    post: (database, models) => {
        return async (context, next) => {
            await next();

            // get params
            const body = context.request.body || {};
            const type = body.type || null;

            // param check
            if (!type) {
                Log.error('status 400', `type: ${type}`);
                return context.response.status = 400;
            }

            // do different thing when get different 'type' param
            switch (type) {
                case 'comment':
                    // get params
                    const postId = commentBody.postId || null;
                    const commentBody = commentBody.body || null;

                    // check params
                    if (!postId || !postId.match(normalRegex.naturalNumber)) {
                        Log.error('status 400', `postId: ${postId}`);
                        return context.response.status = 400;
                    }
                    if (!commentBody) {
                        Log.error('status 400', `body: ${commentBody}`);
                        return context.response.status = 400;
                    }

                    // query if post exist
                    let exist;
                    try {
                        exist = await models.post.exist({
                            where: {
                                id: postId
                            }
                        });
                    } catch (e) {
                        Log.error('status 500', e);
                        return context.response.status = 500;
                    }

                    // if not exist
                    if (!exist) {
                        Log.error('status 400', `postId: ${postId}`);
                        return context.response.status = 400;
                    }

                    // judge if user login
                    if (!context.session.userLogin || !context.session.userInfo) {
                        Log.error('status 400', `userLogin: false`);
                        return context.response.status = 400;
                    }

                    // get creator user info
                    let creator;
                    try {
                        creator = await models.user.findOne({
                            where: {
                                id: context.session.userInfo.id
                            }
                        });
                    } catch (e) {
                        Log.error('status 500', e);
                        return context.response.status = 500;
                    }

                    // if get no user
                    if (!creator) {
                        Log.error('status 400', `fake user info in session`);
                        return context.response.status = 400;
                    }

                    // create new comment
                    let comment;
                    try {
                        comment = await models.comment.create({
                            body: commentBody,
                            isChild: false
                        });
                    } catch (e) {
                        Log.error('status 500', e);
                        return context.response.status = 500;
                    }

                    // if create failed
                    if (!comment) {
                        Log.error('status 500', `create comment failed`);
                        return context.response.status = 400;
                    }

                    // create relation
                    try {
                        await creator.addComment(comment);
                        await post.addComment(comment);                        
                    } catch (e) {
                        Log.error('status 500', e);
                        return context.response.status = 500;
                    }

                    // return result
                    return context.response.body = {
                        success: true
                    };
                case 'reply':
                    return null;
                default:
                    Log.error('status 400', `type: ${type}`);
                    return context.response.status = 400;
            }
        };
    }
};