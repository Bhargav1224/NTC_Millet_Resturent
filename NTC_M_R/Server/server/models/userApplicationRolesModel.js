const { DataTypes } = require('sequelize');
const uuid4 = require('uuid4');
const sequelize = require('../config/dbConfig');

const UserApplicationsRoles = sequelize.define("user_applications_roles", {
    userId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.NUMBER,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    applicationId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.NUMBER
    },
    rolesId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.NUMBER,
        references: {
            model: 'roles',
            key: 'id'
        }
    },
    miscData: {
        type: DataTypes.TEXT,
        allowNull: true
    },

},{timestamps: false});

module.exports = UserApplicationsRoles;