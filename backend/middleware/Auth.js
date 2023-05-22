import Users from "../models/UserModel.js";
import Status from "../models/StatusModel.js";

export const verifyUser = async(req, res, next) => {
    if(!req.session.userId){
        return res.status(401).json({msg: "mohon login ke akun anda"});
    }
    const user = await Users.findOne({
        where:{
            uuid: req.session.userId
        },
        include:[
            {
                model:Status,
                attributes:['uuid','name','code']
            }
        ]
    });
    if(!user) return res.status(404).json({msg: "user tidak ditemukan"});
    if(user.status.code !== 2) return res.status(403).json({msg: "anda belum mendapatkan akses"});
    req.userId = user.id;
    next();
}