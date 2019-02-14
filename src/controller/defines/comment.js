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
                        let parentCreator, parentCreatorList = [];
                        try {
                            parentCreatorList = await parentComments[i].getCreators();
                        } catch (e) {
                            Log.error('status 500', e);
                            return context.response.status = 500;
                        }
                        parentCreator = parentCreatorList[0] || null;
                        
                        // ready children
                        let children = [];
                        for (let j = 0; j < childrenComments.length; j++) {
                            if (childrenComments[j].parent === parentComments[i].id) {
                                // deal creator and mention user info
                                let childCreator, childCreatorList = [];
                                let childMention, childMentionList = [];
                                try {
                                    childCreatorList = await childrenComments[j].getCreators();
                                    childMentionList = await childrenComments[j].getMentions();
                                } catch (e) {
                                    Log.error('status 500', e);
                                    return context.response.status = 500;
                                }
                                childCreator = childCreatorList[0] || null;
                                childMention = childMentionList[0] || null;

                                // deal datetime
                                let childCreatedAt = childrenComments[j].createdAt;
                                let childYear = childCreatedAt.getFullYear();
                                let childMonth = childCreatedAt.getMonth() + 1;
                                let childDate = childCreatedAt.getDate();
                                let childHours = childCreatedAt.getHours();
                                let childMinutes = childCreatedAt.getMinutes();
                                let childSeconds = childCreatedAt.getSeconds();

                                // push object
                                children.push({
                                    id: childrenComments[j].id,
                                    body: childrenComments[j].body,
                                    datetime: `${childYear}-${childMonth}-${childDate} ${childHours}:${childMinutes}:${childSeconds}`,
                                    creator: childCreator && {
                                        id: childCreator.id,
                                        type: childCreator.type,
                                        key: childCreator.key,
                                        nickname: childCreator.nickname,
                                        avatar: childCreator.avatar,
                                        email: childCreator.email
                                    },
                                    mention: childMention && {
                                        id: childMention.id,
                                        type: childMention.type,
                                        key: childMention.key,
                                        nickname: childMention.nickname,
                                        avatar: childMention.avatar,
                                        email: childMention.email
                                    }
                                });
                            }
                        }

                        // deal datetime
                        let parentCreatedAt = parentComments[i].createdAt;
                        let parentYear = parentCreatedAt.getFullYear();
                        let parentMonth = parentCreatedAt.getMonth() + 1;
                        let parentDate = parentCreatedAt.getDate();
                        let parentHours = parentCreatedAt.getHours();
                        let parentMinutes = parentCreatedAt.getMinutes();
                        let parentSeconds = parentCreatedAt.getSeconds();
                        
                        // push to result list
                        result.push({
                            id: parentComments[i].id,
                            body: parentComments[i].body,
                            datetime: `${parentYear}-${parentMonth}-${parentDate} ${parentHours}:${parentMinutes}:${parentSeconds}`,
                            creator: parentCreator && {
                                id: parentCreator.id,
                                type: parentCreator.type,
                                key: parentCreator.key,
                                nickname: parentCreator.nickname,
                                avatar: parentCreator.avatar,
                                email: parentCreator.email
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
                    const postId = body.postId || null;
                    const commentBody = body.body || null;

                    // check params
                    if (!postId || !postId.toString().match(normalRegex.naturalNumber)) {
                        Log.error('status 400', `postId: ${postId}`);
                        return context.response.status = 400;
                    }
                    if (!commentBody) {
                        Log.error('status 400', `body: ${commentBody}`);
                        return context.response.status = 400;
                    }

                    // query if post exist
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

                    // if not exist
                    if (!post) {
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

                    // deal datetime
                    const createdAt = comment.createdAt;
                    const year = createdAt.getFullYear();
                    const month = createdAt.getMonth() + 1;
                    const date = createdAt.getDate();
                    const hours = createdAt.getHours();
                    const minutes = createdAt.getMinutes();
                    const seconds = createdAt.getSeconds();

                    // return result
                    return context.response.body = {
                        success: true,
                        comment: {
                            id: comment.id,
                            body: comment.body,
                            datetime: `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`,
                            creator: {
                                id: creator.id,
                                type: creator.type,
                                key: creator.key,
                                nickname: creator.nickname,
                                avatar: creator.avatar,
                                email: creator.email
                            }
                        }
                    };
                case 'reply':
                    // get params
                    const replyPostId = body.postId || null;
                    const replyParentId = body.parentId || null;
                    const replyMentionId = body.mentionId || null;
                    const replyBody = body.body || null;

                    // params check
                    if (!replyPostId || !replyPostId.toString().match(normalRegex.naturalNumber)) {
                        Log.error('status 400', `postId: ${replyPostId}`);
                        return context.response.status = 400;
                    }
                    if (!replyParentId || !replyParentId.toString().match(normalRegex.naturalNumber)) {
                        Log.error('status 400', `parentId: ${replyParentId}`);
                        return context.response.status = 400;
                    }
                    if (!replyMentionId || !replyMentionId.toString().match(normalRegex.naturalNumber)) {
                        Log.error('status 400', `mentionId: ${replyMentionId}`);
                        return context.response.status = 400;
                    }
                    if (!replyBody) {
                        Log.error('status 400', `body: ${replyBody}`);
                        return context.response.status = 400;
                    }

                    // query if the post exist
                    let replyPost;
                    try {
                        replyPost = await models.post.findOne({
                            where: {
                                id: replyPostId
                            }
                        });
                    } catch (e) {
                        Log.error('status 500', e);
                        return context.response.status = 500;
                    }

                    // if not exist
                    if (!replyPost) {
                        Log.error('status 400', `postId: ${replyPostId}`);
                        return context.response.status = 400;
                    }

                    // judge if user login
                    if (!context.session.userLogin || !context.session.userInfo) {
                        Log.error('status 400', `userLogin: false`);
                        return context.response.status = 400;
                    }

                    // get creator user info
                    let replyCreator;
                    try {
                        replyCreator = await models.user.findOne({
                            where: {
                                id: context.session.userInfo.id
                            }
                        });
                    } catch (e) {
                        Log.error('status 500', e);
                        return context.response.status = 500;
                    }

                    // if get no user
                    if (!replyCreator) {
                        Log.error('status 400', `fake user info in session`);
                        return context.response.status = 400;
                    }

                    // get mention user info
                    let replyMention;
                    try {
                        replyMention = await models.user.findOne({
                            where: {
                                id: replyMentionId
                            }
                        });
                    } catch (e) {
                        Log.error('status 500', e);
                        return context.response.status = 500;
                    }

                    // if get no user
                    if (!replyMention) {
                        Log.error('status 400', `mentionId: ${replyMentionId}`);
                        return context.response.status = 400;
                    }

                    // query if parent comment exist
                    let replyParentCommentCount = 0;
                    try {
                        replyParentCommentCount = await models.comment.count({
                            where: {
                                id: replyParentId
                            }
                        });
                    } catch (e) {
                        Log.error('status 500', e);
                        return context.response.status = 500;
                    }

                    // if not exist
                    if (replyParentCommentCount === 0) {
                        Log.error('status 400', `parentId: ${replyParentId}`);
                        return context.response.status = 400;
                    }

                    // create new comment
                    let replyComment;
                    try {
                        replyComment = await models.comment.create({
                            body: replyBody,
                            isChild: true,
                            parent: replyParentId
                        });
                    } catch (e) {
                        Log.error('status 500', e);
                        return context.response.status = 500;
                    }

                    // if create failed
                    if (!replyComment) {
                        Log.error('status 500', `create reply failed`);
                        return context.response.status = 500;
                    }

                    // create relations
                    try {
                        await replyComment.addMention(replyMention);
                        await replyCreator.addComment(replyComment);
                        await replyPost.addComment(replyComment);
                    } catch (e) {
                        Log.error('status 500', e);
                        return context.response.status = 500;
                    }

                    // deal datetime
                    const replyCreatedAt = replyComment.createdAt;
                    const replyYear = replyCreatedAt.getFullYear();
                    const replyMonth = replyCreatedAt.getMonth() + 1;
                    const replyDate = replyCreatedAt.getDate();
                    const replyHours = replyCreatedAt.getHours();
                    const replyMinutes = replyCreatedAt.getMinutes();
                    const replySeconds = replyCreatedAt.getSeconds();

                    // return result
                    return context.response.body = {
                        success: true,
                        reply: {
                            id: replyComment.id,
                            body: replyComment.body,
                            datetime: `${replyYear}-${replyMonth}-${replyDate} ${replyHours}:${replyMinutes}:${replySeconds}`,
                            creator: {
                                id: replyCreator.id,
                                type: replyCreator.type,
                                key: replyCreator.key,
                                nickname: replyCreator.nickname,
                                avatar: replyCreator.avatar,
                                email: replyCreator.email
                            },
                            mention: {
                                id: replyMention.id,
                                type: replyMention.type,
                                key: replyMention.key,
                                nickname: replyMention.nickname,
                                avatar: replyMention.avatar,
                                email: replyMention.email
                            }
                        }
                    };
                default:
                    Log.error('status 400', `type: ${type}`);
                    return context.response.status = 400;
            }
        };
    }
};