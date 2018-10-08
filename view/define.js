/**
 * /view/define
 * @author John Kindem
 */

const config = require('../config');
const controllerDefineObject = require('../controller/define');

const viewConfig = config.view;
const commonUrlPrefix = viewConfig.commonUrlPrefix;

module.exports = [{
    type: 'deal',
    url: `${commonUrlPrefix}/admin`,
    func: null
}, {
    type: 'middleware',
    func: null
}];