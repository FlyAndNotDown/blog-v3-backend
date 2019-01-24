/**
 * /controller/define.js
 * @author John Kindem
 */

import adminLoginController from './defines/admin/login';
import testController from './defines/test';
import postController from './defines/post';
import labelController from './defines/label';
import userLocalController from './defines/user/local';
import userLoginController from './defines/user/login';

export default [
    testController,
    adminLoginController,
    postController,
    labelController,
    userLocalController,
    userLoginController
];
