const AdminBro = require('admin-bro');

const { User, Blog } = require('../models');
const AdminBroSequelize = require('admin-bro-sequelizejs');

AdminBro.registerAdapter(AdminBroSequelize);
const adminBro = new AdminBro({

    rootPath: '/admin',
    loginPath: '/admin/login',
    resources: [User, Blog],
    branding: {
        companyName: 'AdminBro Tutorial',
        softwareBrothers: false,
    }
});
module.exports = adminBro;