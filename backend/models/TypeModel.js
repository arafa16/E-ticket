import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Status from "./StatusModel.js";

const {DataTypes} = Sequelize;

const Types = db.define('types',{
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
            notEmpty: true
        }
    },
    code:{
        type: DataTypes.INTEGER,
        allowNull : false,
        validate: {
            notEmpty: true
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

Status.hasMany(Types);
Types.belongsTo(Status, {foreignKey: 'statusId'});

export default Types;