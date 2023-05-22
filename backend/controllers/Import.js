import xlxs from 'xlsx';
import Users from '../models/UserModel.js';
import path from 'path';
import fs from 'fs';

export const ImportUser = async(req, res) => {
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const file = req.files.file;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;

    file.mv(`./public/data/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});

        let workbook = xlxs.readFile(`./public/data/${fileName}`);
        let worksheet = workbook.Sheets[workbook.SheetNames[0]];
        let range = xlxs.utils.decode_range(worksheet["!ref"]);

        for (let row = range.s.r; row<= range.e.r; row++){
            let data = [];

            for(let col = range.s.c;col<=range.e.c;col++){
                let cell = worksheet[xlxs.utils.encode_cell({r:row, c:col})]
                data.push(cell.v);
            }
            // console.log(data);
            try {
                await Users.create({
                    name: data[2],
                    email: data[3],
                    nomorHp: data[7],
                    password: data[6],
                    statusId: data[8]
                });
                console.log('success');
            } catch (error) {
                console.log(error)
            }
        }
        const filepath = `./public/data/${fileName}`;
        fs.unlinkSync(filepath);
    })
    
    return res.status(200).json({msg: "success"});
}