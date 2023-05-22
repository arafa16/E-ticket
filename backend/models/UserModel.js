import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Status from "./StatusModel.js";

const {DataTypes} = Sequelize;

const Users = db.define('users',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull : false,
        validate: {
            notEmpty: true
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull : false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull : false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    image:{
        type: DataTypes.STRING,
        allowNull : true,
        validate: {
            notEmpty: false,
        }
    },
    url:{
        type: DataTypes.STRING,
        allowNull : true,
        validate: {
            notEmpty: false,
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull : false,
        validate: {
            notEmpty: true
        }
    },
    nomorHp:{
        type: DataTypes.STRING,
        allowNull : true,
        validate: {
            notEmpty: false
        }
    },
    statusId:{
        type: DataTypes.INTEGER,
        allowNull : true,
        validate: {
            notEmpty: false
        }
    }
},{
    freezeTableName: true
});

Status.hasMany(Users);
Users.belongsTo(Status, {foreignKey : 'statusId'});

export default Users;