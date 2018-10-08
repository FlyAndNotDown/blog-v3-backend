/**
 * /controller/define/admin/login.js
 * @author John Kindem
 */

const config = require('../../../config');

const controllerConfig = config.controller;

module.exports = {
    url: `${controllerConfig.commonUrlPrefix}/admin/login`,
    get: function (models) {
        return function (req, res) {
            // TODO
        }
    }
};