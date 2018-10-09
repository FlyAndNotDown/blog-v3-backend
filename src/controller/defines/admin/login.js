/**
 * /controller/define/admin/login.js
 * @author John Kindem
 */

import controllerConfig from '../../../configs/controller';
import { Log } from "../../../tool/log";

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