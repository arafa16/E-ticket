import Users from "../models/UserModel.js"
import argon2 from 'argon2';
import { EmptyResultError, Sequelize } from "sequelize";
import Status from "../models/StatusModel.js";
import path from 'path';
import fs from 'fs';

const Op = Sequelize.Op;

export const getUsers = async(req, res) => {
    try {
        const limit = parseInt(req.params.limit);
        const page = parseInt(req.params.page);
        const offset = (page - 1) * limit;

        const response = await Users.findAndCountAll({
            attributes:['uuid','name','email','nomorHp','statusId'],
            include:{
                model:Status,
                attributes:['uuid','name','code']
            },
            limit:limit,
            offset:offset
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const getUsers2 = async(req, res) => {
    try {
        const limit = parseInt(req.params.limit);
        const page = parseInt(req.params.page);
        const code = parseInt(req.params.code);
        const offset = (page - 1) * limit;

        const response = await Users.findAndCountAll({
            attributes:['uuid','name','email','nomorHp','statusId'],
            include:{
                model:Status,
                attributes:['uuid','name','code'],
                where:{
                    code:[code]
                }
            },
            limit:limit,
            offset:offset
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const findUsers = async(req, res) => {
    try {
        const response = await Users.findAll({
            where:{
                name: {
                    [Op.like]: `%${req.params.name}%`
                }
            }
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const getUserById = async(req, res) => {
    try {
        const response = await Users.findOne({
            where:{
                uuid: req.params.id
            },
            include:{
                model:Status,
                attributes:["uuid","name","code"]
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const createUser = async(req, res) => {
    const {name, email, nomorHp, password, confPassword} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "password dan confirmation password tidak cocok"});
    const hasPassword = await argon2.hash(password);
    const status = await Status.findOne({
        where:{
            code:'3'
        }
    });
    if(!status) return res.status(404).json({msg: "status tidak ditemukan"});
    try {
        await Users.create({
            name: name,
            email: email,
            nomorHp: nomorHp,
            password: hasPassword,
            statusId:status.id
        })
        return res.status(201).json({msg: "Pendaftaran Berhasil silahkan tunggu validasi dari admin"});
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

export const createUserByAdmin = async(req, res) => {
    const {name, email, nomorHp, password, statusId} = req.body;
    const status = await Status.findOne({
        where:{
            uuid:statusId
        }
    });
    if(!status) return res.status(404).json({msg: "status tidak ditemukan"});
    const hasPassword = await argon2.hash(password);
    try {
        await Users.create({
            name: name,
            email: email,
            nomorHp: nomorHp,
            password: hasPassword,
            statusId:status.id
        });
        return res.status(201).json({msg: "success"});
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

export const updateUser = async(req, res) => {
    const user = await Users.findOne({
        where:{
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "user tidak ditemukan"});
    const {name, email, nomorHp, statusId} = req.body;
    const status = await Status.findOne({
        where:{
            uuid: statusId
        }
    });
    if(!status) return res.status(404).json({msg: "user tidak ditemukan"});
    try {
        await Users.update({
            name: name,
            email: email,
            nomorHp: nomorHp,
            statusId:status.id
        },{
            where:{
                id: user.id
            }
        });
        return res.status(200).json({msg: "User Updated"});
    } catch (error) {
        await res.status(500).json({msg: error.message});
    }
}

export const deleteUser = async(req, res) => {
    const user = await Users.findOne({
        where:{
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "user tidak ditemukan"});
    try {
        await Users.destroy({
            where:{
                id: user.id
            }
        });
        return res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        await res.status(500).json({msg: error.message});
    }
}

export const uploadFoto = async(req, res) => {
    const user = await Users.findOne({
        where:{
            uuid:req.params.id
        }
    });
    if(!user) return res.status(400).json({msg: "user tidak ditemukan"});
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/profile/${fileName}`;
    const allowedType = ['.png','.jpg','.jpeg'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: 'invalid images'});
    if(fileSize > 5000000) return res.status(422).json({msg: "images must be less than 5 MB"});

    //delete foto
    if(user.image !== null){
        const filepath = `./public/images/profile/${user.image}`;
        fs.unlinkSync(filepath);
    }
    
    file.mv(`./public/images/profile/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Users.update({
                image:fileName,
                url:url
            },{
                where:{
                    id:user.id
                }
            });
            res.status(201).json({msg: "Image Uploaded Successfuly"});
        } catch (error) {
            console.log(error.message);
        }
    })
}

export const updatePassword = async(req, res) => {
    const {password} = req.body;
    const user = await Users.findOne({
        where:{
            uuid: req.params.id
        }
    });
    if(!user) return res.status(400).json({msg: "user tidak ditemukan"});
    const hasPassword = await argon2.hash(password);
    try {
        await Users.update({
            password:hasPassword
        },{
            where:{
                id:user.id
            }
        });
        res.status(201).json({msg: "success"});
    } catch (error) {
        res.status(500).json(error);
    }
}