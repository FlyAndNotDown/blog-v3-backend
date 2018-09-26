/**
 * /model/define/admin.js
 * @author John Kindem
 */

module.exports = {
    name: 'admin',
    description: {
        id: { type: 'serial' },
        name: { type: 'text', size: 20 },
        username: { type: 'text', size: 20 },
        password: { type: 'text', size: 64 },
        salt: { type: 'text', size: 12 }
    }
};
