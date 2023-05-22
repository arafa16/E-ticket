import Privilege from "../models/PrivilegeModel.js";
import Users from "../models/UserModel.js";

export const getPrivilege = async(req, res) => {
    try {
        const response = await Privilege.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getPrivilege2 = async(req, res) => {
    const user = await Users.findOne({
        where:{
            uuid:req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "tidak ditemukan user tersebut"});
    try {
        const response = await Privilege.findOne({
            where:{
                userId:user.id
            },
            attributes:['uuid','helpDesk','tiket','adminTiket','setting','dataUser','dashboard']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const createPrivilege = async(req, res) =>{
    const {id, helpDesk, tiket, adminTiket, setting, dataUser, dashboard} = req.body;
    const user = await Users.findOne({
        where:{
            uuid:id
        }
    });
    if(!user) return res.status(404).json({msg: "user tidak ditemukan"});
    const cekUser = await Privilege.findOne({
        where:{
            userId:user.id
        }
    });
    if(user) return res.status(403).json({msg: "user sudah mempunyai privilege"});
    try {
        await Privilege.create({
            userId:user.id,
            helpDesk:helpDesk,
            tiket:tiket,
            adminTiket:adminTiket,
            setting:setting,
            dataUser:dataUser,
            dashboard:dashboard
        });
        res.status(200).json({msg: "success"});
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

export const updatePrivilege = async(req, res) =>{
    const {helpDesk, tiket, adminTiket, setting, dataUser, dashboard} = req.body;
    const user = await Users.findOne({
        where:{
            uuid:req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "user tidak ditemukan"});
    const cekUser = await Privilege.findOne({
        where:{
            userId:user.id
        }
    });
    if(!cekUser){
        try {
            await Privilege.create({
                userId:user.id,
                helpDesk:helpDesk,
                tiket:tiket,
                adminTiket:adminTiket,
                setting:setting,
                dataUser:dataUser,
                dashboard:dashboard
            });
            res.status(200).json({msg: "create success"});
        } catch (error) {
            res.status(500).json({msg: error});
        }
    }
    else{
        try {
            await Privilege.update({
                userId:user.id,
                helpDesk:helpDesk,
                tiket:tiket,
                adminTiket:adminTiket,
                setting:setting,
                dataUser:dataUser,
                dashboard:dashboard
            },{
                where:{
                    id:cekUser.id
                }
            });
            res.status(200).json({msg: "update success"});
        } catch (error) {
            res.status(500).json({msg: error});
        }
    }
    
}