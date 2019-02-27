/**
 * /controller/define.js
 * @author John Kindem
 */

import adminLoginController from './defines/admin/login';
import testController from './defines/test';
import postController from './defines/post';
import labelController from './defines/label';
import commentController from './defines/comment';
import messageController from './defines/message';
import friendController from './defines/friend';
import userLocalController from './defines/user/local';
import userLoginController from './defines/user/login';
import userGithubController from './defines/user/github';

export default [
    testController,
    adminLoginController,
    postController,
    labelController,
    commentController,
    messageController,
    friendController,
    userLocalController,
    userLoginController,
    userGithubController
];
