const AccessControl = require('accesscontrol');

let grantsObject = {
    ROLE_BASIC: {
        demo: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        }
    },
    ROLE_PRODUCT_ADMIN: {
        demo: {
            'create:own': ['*'],
            'read:own': ['*'],
            'update:own': ['*'],
            'delete:own': ['*']
        }
    },
    ROLE_CONSUMER: {
        demo: {
            'create:own': ['*'],
            'read:own': ['*'],
            'update:own': ['*'],
            'delete:own': ['*']
        }
    }
};
const ac = new AccessControl(grantsObject);

module.exports = ac