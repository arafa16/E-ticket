import Status from "../models/StatusModel.js";
import StatusTickets from "../models/StatusTicketModel.js";

export const getStatusTicket = async(req, res) => {
    try {
        const response = await StatusTickets.findAll({
            include:[
                {
                    model: Status,
                    attributes:['uuid','name',"code"]
                }
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        await res.status(500).json({msg: error.message})
    }
}

export const getStatusTicketById = async(req, res) => {
    try {
        const response = await StatusTickets.findOne({
            where:{
                uuid:req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        await res.status(500).json({msg: error.message})
    }
}

export const createStatusTicket = async(req, res) => {
    const {idStatus, name, code} = req.body;
    const status = await Status.findOne({
        where:{
            uuid:idStatus
        }
    });
    if(!status) return res.status(400).json({msg: "status tidak ditemukan"});
    try {
        await StatusTickets.create({
            name:name,
            code:code,
            statusId:status.id
        });
        res.status(201).json({msg: "success"});
    } catch (error) {
        await res.status(500).json({msg: error.message});
    }
}

export const updateStatusTicket = async(req, res) => {
    const {idStatus, name, code} = req.body;
    const status1 = await Status.findOne({
        where:{
            uuid:idStatus
        }
    });
    if(!status1) return res.status(400).json({msg: "status tidak ditemukan"});
    const status = await StatusTickets.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!status) return res.status(404).json({msg: "status ticket tidak ditemukan"});
    if(!name || name === null) return res.status(400).json({msg: "nama status ticket tidak boleh kosong"});
    if(!code || code === null) return res.status(400).json({msg: "code status ticket tidak boleh kosong"});
    try {
        await StatusTickets.update({
            name:name,
            code: code,
            statusId:status1.id
        },{
            where:{
                id:status.id
            }
        });

        res.status(201).json({msg: "update berhasil"});
    } catch (error) {
        await res.status(500).json({msg: error.message})
    }
}

export const deleteStatusTicket = async(req, res) => {
    try {
        await StatusTickets.destroy({
            where:{
                uuid:req.params.id
            }
        })
        res.status(200).json({msg: "deleted success"});
    } catch (error) {
        await res.status(500).json({msg: error.message});
    }
}