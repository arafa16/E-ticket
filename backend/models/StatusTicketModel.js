import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Status from "./StatusModel.js";

const {DataTypes} = Sequelize;

const StatusTickets = db.define('status_tickets',{
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

Status.hasMany(StatusTickets);
StatusTickets.belongsTo(Status, {foreignKey: 'statusId'});

export default StatusTickets;