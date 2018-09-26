/**
 * /script/update-model.js
 * @author John Kindem
 */

const Connector = require('../database/connector');
const Model = require('../model/model');
const Log = require('../tool/log');

(function() {
    let connection = Connector.getInstance().getConnection();
    let model = new Model(connection);
    connection.sync((err) => {
        if (err) {
            Log.error('更新模型失败', err);
            process.exit(0);
        }
        Log.log('更新模型成功');
        process.exit(0);
    });
})();
