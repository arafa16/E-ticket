import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Responsible from "./ResponsibleModel.js";
import StatusTickets from "./StatusTicketModel.js";
import Types from "./TypeModel.js";
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;

const Tickets = db.define('tickets',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull : false,
        validate: {
            notEmpty: true
        }
    },
    nomor:{
        type: DataTypes.INTEGER,
        allowNull : false,
        validate: {
            notEmpty: true
        }
    },
    request:{
        type: DataTypes.STRING,
        allowNull : false,
        validate: {
            notEmpty: true
        }
    },
    typeId:{
        type: DataTypes.INTEGER,
        allowNull : true,
        validate: {
            notEmpty: false
        }
    },
    statusTicketId:{
        type: DataTypes.INTEGER,
        allowNull : true,
        validate: {
            notEmpty: false
        }
    },
    startDate:{
        type: DataTypes.DATE,
        allowNull : false,
        validate: {
            notEmpty: true
        }
    },
    endDate:{
        type: DataTypes.DATE,
        allowNull : false,
        validate: {
            notEmpty: true
        }
    },
    responsibleId:{
        type: DataTypes.INTEGER,
        allowNull : true,
        validate: {
            notEmpty: false
        }
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull : true,
        validate: {
            notEmpty: false
        }
    }
},{
    freezeTableName: true
});

// user
Users.hasMany(Tickets);
Tickets.belongsTo(Users, {foreignKey: 'userId'});

// status tickets 
StatusTickets.hasMany(Tickets);
Tickets.belongsTo(StatusTickets, {foreignKey: 'statusTicketId'});

// types 
Types.hasMany(Tickets);
Tickets.belongsTo(Types, {foreignKey: 'typeId'});

// responsible
Types.hasMany(Tickets);
Tickets.belongsTo(Responsible, {foreignKey: 'responsibleId'});


export default Tickets;