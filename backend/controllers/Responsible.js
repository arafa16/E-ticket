import Responsible from "../models/ResponsibleModel.js";
import Status from "../models/StatusModel.js";
import Users from "../models/UserModel.js";

export const getResponsible = async(req, res) => {
    try {
        const response = await Responsible.findAll({
            attributes:['uuid'],
            include:[{
                model:Users,
                attributes:['uuid','name']
            },{
                model:Status,
                attributes:['uuid','name']
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createResponsible = async(req, res) => {
    const {id, idStatus} = req.body;
    const status = await Status.findOne({
        where:{
            uuid:idStatus
        }
    });
    if(!status) return res.status(400).json({msg: "status tidak di temukan"});
    const user = await Users.findOne({
        where:{
            uuid:id
        }
    });
    if(!user) return res.status(400).json({msg: "user tidak di temukan"});
    try {
        await Responsible.create({
            userId:user.id,
            statusId:status.id
        });
        res.status(200).json({msg: "success"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateResponsible = async(req, res) => {
    const {id, idStatus, userId} = req.body;
    const responsible = await Responsible.findOne({
        where:{
            uuid:req.params.id
        }
    });
    if(!responsible) res.status(404).json({msg: "data tidak ditemukan"});
    const status = await Status.findOne({
        where:{
            uuid:idStatus
        }
    });
    if(!status) return res.status(404).json({msg: "status tidak di temukan"});
    const user = await Users.findOne({
        where:{
            uuid:userId
        }
    });
    if(!user) return res.status(400).json({msg: "user tidak di temukan"});
    try {
        await Responsible.update({
            userId:user.id,
            statusId:status.id
        },{
            where:{
                id:responsible.id
            }
        });
        res.status(200).json({msg: "success"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteResponsible = async(req, res) => {
    const responsible = await Responsible.findOne({
        where:{
            uuid:req.params.id
        }
    });
    if(!responsible) return res.status(403).json({msg: "user tersebut tidak ditemukan"});
    try {
        await Responsible.destroy({
            where:{
                id:responsible.id
            }
        })
        res.status(200).json({msg: "success"});
    } catch (error) {
        res.status(500).json(error.message);
    }
}