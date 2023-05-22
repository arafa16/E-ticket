import Status from "../models/StatusModel.js";
import Types from "../models/TypeModel.js";

export const getTypes = async(req, res) => {
    try {
        const response = await Types.findAll({
            attributes:['uuid','name','code'],
            include:[{
                model: Status,
                attributes:['uuid','name']
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const getTypeById = async(req, res) => {
    const type = await Types.findOne({
        where:{
            uuid:req.body.id
        }
    });
    if(!type) return res.status(404).json({msg: "type tidak ditemukan"});
    try {
        const response = await Types.findOne({
            where:{
                id:type.id
            }
        });
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

export const createType = async(req, res) => {
    const {name, code, idStatus} = req.body;
    const status = await Status.findOne({
        where:{
            uuid:idStatus
        }
    });
    if(!status) return res.status(400).json({msg: "status tidak ditemukan"});
    if(!name || !code) return res.status(400).json({msg: "field tidak boleh kosong"});
    try {
        await Types.create({
            name:name,
            code:code,
            statusId: status.id
        })
        return res.status(200).json({msg: "success"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateType = async(req, res) => {
    const {name, code, idStatus} = req.body;
    const status = await Status.findOne({
        where:{
            uuid:idStatus
        }
    });
    if(!status) return res.status(400).json({msg: "status tidak ditemukan"});
    const type = await Types.findOne({
        where:{
            uuid:req.params.id
        }
    });
    if(!type) return res.status(400).json({msg: "type tidak ditemukan"});
    try {
        await Types.update({
            name:name,
            code:code,
            statusId: status.id
        },{
            where:{
                id:type.id
            }
        });
        return res.status(201).json({msg: "success"});
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

export const deleteType = async(req, res) => {
    const type = await Types.findOne({
        where:{
            uuid:req.params.id
        }
    });
    if(!type) return res.status(400).json({msg: "type tidak ditemukan"});
    try {
        await Types.destroy({
            where:{
                id:type.id
            }
        });
        return res.status(200).json({})
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}