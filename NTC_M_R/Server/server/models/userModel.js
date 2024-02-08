const { DataTypes, Model } = require('sequelize');
const uuid4 = require('uuid4');
const sequelize = require('../config/dbConfig');
// const roles = require('../models/roleModel');
const User = sequelize.define("users", {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.NUMBER,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    lastName: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    userSurrogateID: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    mobileNumber: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    mobileNumberCountryCode: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    isMobileNumberVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 1
    },
    status: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        defaultValue: null,
        allowNull: true
    },
    passwordSalt: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    email: {
        type: DataTypes.TEXT,
        defaultValue: null,
        allowNull: false,
        validate: {
            isEmail: true
        },
    },
    isEmailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
        allowNull: false
    },
    type: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
        allowNull: false
    },
    // roleId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: true,
    //     defaultValue: 1
    //     // references: {
    //     //     model: 'roles',
    //     //     key: 'id'
    //     // }
    // },
    createdBy: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    updatedBy: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATEONLY,
        defaultValue: new Date()
    },
    updatedAt: {
        type: DataTypes.DATEONLY,
        defaultValue: new Date()
    }
});

module.exports = User;