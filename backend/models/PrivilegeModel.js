import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;

const Privilege = db.define('privilege',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull : false,
        validate: {
            notEmpty: true
        }
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull : true,
        validate: {
            notEmpty: false
        }
    },
    helpDesk:{
        type: DataTypes.INTEGER,
        allowNull : true,
        defaultValue: 0,
        validate: {
            notEmpty: false
        }
    },
    tiket:{
        type: DataTypes.INTEGER,
        allowNull : true,
        defaultValue: 0,
        validate: {
            notEmpty: false
        }
    },
    adminTiket:{
        type: DataTypes.INTEGER,
        allowNull : true,
        defaultValue: 0,
        validate: {
            notEmpty: false
        }
    },
    setting:{
        type: DataTypes.INTEGER,
        allowNull : true,
        defaultValue: 0,
        validate: {
            notEmpty: false
        }
    },
    dataUser:{
        type: DataTypes.INTEGER,
        allowNull : true,
        defaultValue: 0,
        validate: {
            notEmpty: false
        }
    },
    dashboard:{
        type: DataTypes.INTEGER,
        allowNull : true,
        defaultValue: 0,
        validate: {
            notEmpty: false
        }
    }
},{
    freezeTableName: true
});

Users.hasMany(Privilege);
Privilege.belongsTo(Users, {foreignKey: 'userId'});

export default Privilege;
