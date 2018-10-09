/**
 * /controller/define/admin/login.js
 * @author John Kindem
 */

import config from '../../../config';
const Log = require('../../../tool/log');

const controllerConfig = config.controller;

module.exports = {
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