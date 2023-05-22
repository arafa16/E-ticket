import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Status from "./StatusModel.js";
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;

const Responsible = db.define('responsible',{
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

Status.hasMany(Responsible);
Responsible.belongsTo(Status, {foreignKey: 'statusId'});

Users.hasMany(Responsible);
Responsible.belongsTo(Users, {foreignKey: 'userId'});

export default Responsible;