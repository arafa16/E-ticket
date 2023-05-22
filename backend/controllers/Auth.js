import Users from "../models/UserModel.js";
import argon2 from 'argon2';
import Status from "../models/StatusModel.js";
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

export const Login = async(req, res) => {
    const user = await Users.findOne({
        where:{
            email: req.body.email
        },
        include:[{
            model:Status,
            attributes:['uuid','name','code']
        }]
    });
    if(!user) return res.status(404).json({msg: "user tidak ditemukan"});
    const match = await argon2.verify(user.password, req.body.password);
    if(!match) return res.status(400).json({msg: "wrong password"});
    if(user.status.code !== 2 ) return res.status(400).json({msg: "anda belum divalidate silahkan hubungi Devisi IT"});
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const url = user.url;
    const nomorHp = user.nomorHp;
    const status = user.status;

    res.status(200).json({uuid, name, email, url, nomorHp, status});
}

export const Me = async(req, res) => { 
    if(!req.session.userId){
        return res.status(401).json({msg: "mohon login ke akun anda"});
    }

    const user = await Users.findOne({
        attributes:['uuid','name','email','url', 'nomorHp'],
        where:{
            uuid: req.session.userId
        },
        include:{
            model: Status,
            attributes:['uuid','name']
        }
    });
    if(!user) return res.status(404).json({msg: "user tidak ditemukan"});
    res.status(200).json(user);
}

export const Logout = (req, res) => {
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "tidak dapat logout"});
        res.status(200).json({msg: "berhasil logout"});
    })
}


export const ResetPassword = async(req,res) => {
    const {email} = req.body;
    const user = await Users.findOne({
        where:{
            email:email
        }
    });
    if(!user) return res.status(404).json({msg: "email tidak ditemukan"});

    const secret = process.env.SESS_SECRET;

    const token = jwt.sign({email: user.email, id: user.id}, secret, {
        expiresIn: "5m"
    });

    const link = `${process.env.LINK}/reset/${user.uuid}/${token}`;
    
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL,
            pass: process.env.MAIL_PASS
        }
    });

    const msg = {
        from: '"Support IT Kopkarla" <no-replay@kopkarla.co.id>',
        to: email,
        subject: "Reset Password",
        text: 
        `click this link for reset your password ${link}`
    };

    try {
        await transporter.sendMail(msg);
        return res.status(200).json({msg: "success, check your email for reset password"});
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

export const getReset = async(req, res) => {
    const {id, token} = req.params;
    const user = await Users.findOne({
        where:{
            uuid:id
        }
    });
    if(!user) return res.status(404).json({msg: "user tidak ditemukan"});
    const secret = process.env.SESS_SECRET;
    try {
        const verify = jwt.verify(token, secret);
        const getUser = await Users.findOne({
            where:{
                id:user.id
            }
        });
        return res.status(200).json(getUser); 
    } catch (error) {
        return res.status(400).json({msg: "not verified or expired"});
    }
}

export const postReset = async(req, res) => {
    const {id, token, password, confPassword} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "password dosn't match"});
    const user = await Users.findOne({
        where:{
            uuid:id
        }
    });
    if(!user) return res.status(404).json({msg: "user tidak ditemukan"});
    const secret = process.env.SESS_SECRET;
    try {
        const verify = jwt.verify(token, secret);
        const hasPassword = await argon2.hash(password);
        await Users.update({
            password:hasPassword
        },{
            where:{
                id:user.id
            }
        });
        return res.status(200).json({msg: "success"});
    } catch (error) {
        res.status(500).json({msg: error});
    }
    
}