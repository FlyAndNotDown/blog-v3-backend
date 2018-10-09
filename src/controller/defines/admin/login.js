/**
 * /controller/define/admin/login.js
 * @author John Kindem
 */

import config from '../../../config';
import { Log } from "../../../tool/log";

const controllerConfig = config.controller;

export default {
    url: `${controllerConfig.commonUrlPrefix}/admin/login`,
    get: function (db, models) {
        return function (req, res) {
            // TODO
            db
                .authenticate()
                .then(() => {
                    Log.log('测试连接数据库成功');
                    res.send('hello');
                });
        }
    }
};