/**
 * /controller/define.js
 * @author John Kindem
 */

import adminLoginController from './defines/admin/login';
import testController from './defines/test';
import postController from './defines/post';
import labelController from './defines/label';
import homeController from './defines/home';

export default [
    testController,
    adminLoginController,
    postController,
    labelController,
    homeController
];
