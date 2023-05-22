import Tickets from "../models/TicketModel.js";
import Responsible from "../models/ResponsibleModel.js";
import Users from "../models/UserModel.js";
import Types from "../models/TypeModel.js";
import StatusTickets from "../models/StatusTicketModel.js";
import { Sequelize } from "sequelize";

const Op = Sequelize.Op;

export const getTickets = async(req, res) => {
    try {
        const response = await Tickets.findAll({
            attributes:['id','uuid','nomor','request','startDate','endDate'],
            include:[{
                model:Users,
                attributes:['uuid','name']
            },{
                model:Responsible,
                attributes:['uuid'],
                include:[{
                    model:Users,
                    attributes:['uuid','name']
                }]
            },{
                model:Types,
                attributes:['uuid','name','code']
            },{
                model:StatusTickets,
                attributes:['uuid','name','code']
            }]
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const getClearTicketTable = async(req, res) => {
    try {
        const limit = parseInt(req.params.limit);
        const page = parseInt(req.params.page);
        const offset = (page - 1) * limit;

        const response = await Tickets.findAndCountAll({
            attributes:['uuid','nomor','request','startDate','endDate'],
            include:[{
                model:Users,
                attributes:['uuid','name']
            },{
                model:Responsible,
                attributes:['uuid'],
                include:[{
                    model:Users,
                    attributes:['uuid','name']
                }]
            },{
                model:Types,
                attributes:['uuid','name','code']
            },{
                model:StatusTickets,
                attributes:['uuid','name','code'],
                where:{
                    code: [4]
                }
            }],
            limit:limit,
            offset:offset,
            order: [
                ['id', 'DESC'],
            ]
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const getClearTicketByUser = async(req, res) => {
    const user = await Users.findOne({
        where:{
            uuid:req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "user tidak ditemukan"});
    try {
        const limit = parseInt(req.params.limit);
        const page = parseInt(req.params.page);
        const offset = (page - 1) * limit;

        const response = await Tickets.findAndCountAll({
            where:{
                userId:user.id
            },
            attributes:['uuid','nomor','request','startDate','endDate'],
            include:[{
                model:Users,
                attributes:['uuid','name']
            },{
                model:Responsible,
                attributes:['uuid'],
                include:[{
                    model:Users,
                    attributes:['uuid','name']
                }]
            },{
                model:Types,
                attributes:['uuid','name','code']
            },{
                model:StatusTickets,
                attributes:['uuid','name','code'],
                where:{
                    code: [4]
                }
            }],
            limit:limit,
            offset:offset,
            order: [
                ['nomor', 'DESC'],
            ]
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const getNewTicketTable = async(req, res) => {
    try {
        const limit = parseInt(req.params.limit);
        const page = parseInt(req.params.page);
        const offset = (page - 1) * limit;

        const response = await Tickets.findAndCountAll({
            attributes:['uuid','nomor','request','startDate','endDate'],
            include:[{
                model:Users,
                attributes:['uuid','name']
            },{
                model:Responsible,
                attributes:['uuid'],
                include:[{
                    model:Users,
                    attributes:['uuid','name']
                }]
            },{
                model:Types,
                attributes:['uuid','name','code']
            },{
                model:StatusTickets,
                attributes:['uuid','name','code'],
                where:{
                    code:{
                        [Op.not]:[4]
                    }
                }
            }],
            limit:limit,
            offset:offset,
            order: [
                ['nomor', 'DESC'],
            ]
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const getNewTicketByUser = async(req, res) => {
    const user = await Users.findOne({
        where:{
            uuid:req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "user tidak ditemukan"});
    try {
        const limit = parseInt(req.params.limit);
        const page = parseInt(req.params.page);
        const offset = (page - 1) * limit;

        const response = await Tickets.findAndCountAll({
            where:{
                userId:user.id
            },
            attributes:['uuid','nomor','request','startDate','endDate'],
            include:[{
                model:Users,
                attributes:['uuid','name']
            },{
                model:Responsible,
                attributes:['uuid'],
                include:[{
                    model:Users,
                    attributes:['uuid','name']
                }]
            },{
                model:Types,
                attributes:['uuid','name','code']
            },{
                model:StatusTickets,
                attributes:['uuid','name','code'],
                where:{
                    code:{
                        [Op.not]:[4]
                    }
                }
            }],
            limit:limit,
            offset:offset,
            order: [
                ['nomor', 'DESC'],
            ]
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const getTicketById = async(req, res) => {
    try {
        const response = await Tickets.findOne({
            attributes:['uuid','nomor','request','startDate','endDate'],
            include:[{
                model:Users,
                attributes:['uuid','name']
            },{
                model:Types,
                attributes:['uuid','name','code']
            },{
                model:StatusTickets,
                attributes:['uuid','name','code']
            }],
            order: [
                ['nomor', 'DESC'],
            ]
        },{
            where:{
                uuid: req.params.id
            }
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const createTicket = async(req, res) => {
    const {userId, request, typeId, statusTicketId, startDate, endDate, responsebleId} = req.body;
    const user = await Users.findOne({
        where:{
            uuid:userId
        }
    });
    if(!user) return res.status(400).json({msg: "user tidak diketahui"});
    const type = await Types.findOne({
        where:{
            uuid: typeId
        }
    });
    if(!type) return res.status(400).json({msg: "type tidak diketahui"});
    const status = await StatusTickets.findOne({
        code:statusTicketId
    });
    if(!status) return res.status(400).json({msg: "status tidak diketahui"});
    const getMaxId = await Tickets.findOne({
        attributes: [[Sequelize.fn('max', Sequelize.col('nomor')), 'maxNomor']],
        raw: true,
    });

    const nomor = getMaxId.maxNomor + 1;

    try {
        await Tickets.create({
            userId:user.id,
            nomor:nomor,
            request:request,
            typeId: type.id,
            statusTicketId:status.id,
            startDate:startDate,
            responsibleId:responsebleId,
            endDate:endDate
        });
        res.status(201).json({msg: "success"});
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const updateTicket = async(req, res) => {
    const ticket = await Tickets.findOne({
        where:{
            uuid: req.params.id
        }
    });
    if(!ticket) return res.status(404).json({msg: "ticket update tidak ditemukan"});
    const {request, typeId, statusTicketId, startDate, endDate} = req.body;
    try {
        await Tickets.update({
            request:request,
            typeId:typeId,
            statusTicketId:statusTicketId,
            startDate:startDate,
            endDate:endDate,
        },{
            where:{
                id:ticket.id
            }
        });
        res.status(201).json({msg: "success"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateStatusTicket = async(req, res) => {
    const ticket = await Tickets.findOne({
        where:{
            uuid: req.params.id
        }
    });
    if(!ticket) return res.status(404).json({msg: "ticket tidak ditemukan"});
    const statusTicket = await StatusTickets.findOne({
        where:{
            uuid:req.body.statusTicketId
        }
    });
    if(!statusTicket) return res.status(404).json({msg: "status ticket tidak ditemukan"});
    try {
        await Tickets.update({
            endDate: req.body.endDate,
            statusTicketId: statusTicket.id
        },{
            where:{
                id:ticket.id
            }
        });
        res.status(201).json({msg: "success"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateResponseTicket = async(req, res) => {
    const ticket = await Tickets.findOne({
        where:{
            uuid: req.params.id
        }
    });
    if(!ticket) return res.status(404).json({msg: "ticket tidak ditemukan"});
    const responsible = await Responsible.findOne({
        where:{
            uuid:req.body.id
        }
    });
    if(!responsible) return res.status(404).json({msg: "responsible tidak ditemukan"});
    try {
        await Tickets.update({
            responsibleId: responsible.id
        },{
            where:{
                id:ticket.id
            }
        });
        res.status(201).json({msg: "success"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteTicket = async(req, res) => {
    const ticket = await Tickets.findOne({
        where:{
            uuid: req.params.id
        }
    });
    if(!ticket) return res.status(404).json({msg: "ticket tidak ditemukan"});
    try {
        await Tickets.destroy({
            where:{
                id:ticket.id
            }
        });
        res.status(201).json({msg: "deleted success"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}