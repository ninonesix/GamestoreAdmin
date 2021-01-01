const formidable = require('formidable');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const GameModel = require('../models/GameModel');

exports.editproduct = async (req, res, next) => {
    const form = formidable({ multiples: true });
    let m_files;
    const formfields = await new Promise(function (resolve, reject) {
        form.parse(req, function (err, fields, files) {
            if (err) {
                reject(err);
                return;
            }
            console.log("within form.parse method, subject field of fields object is: " + fields);
            m_files = files;
            resolve(fields);
        }); // form.parse
    });

    const coverImage = m_files.coverImage;
    const imageName = formfields.name.replace(/ +/g, "") + "coverImg.jpg";

    if (coverImage && coverImage.size > 0) {
        const oldPath = coverImage.path;
        const newPath = __dirname + '/../public/images/' + imageName;
        const rawData = fs.readFileSync(oldPath);
        fs.writeFile(newPath, rawData, function (err) {
            if (err) console.log(err)
        })
    }
    let flag = 0;
    if (coverImage && coverImage.size > 0) {
        await cloudinary.uploader.upload(__dirname + '/../public/images/' + imageName, { public_id: formfields.name.replace(/\s+/g, '') + "coverImg", folder: 'GameStore/Games', unique_filename: false, overwrite: true, "width": 189, "height": 265 })
            .then(function (image) {
                console.log();
                console.log("** File Upload (Promise)");
                console.log("* public_id for the uploaded image is generated by Cloudinary's service.");
                console.log("* " + image.public_id);
                console.log("* " + image.url);
                formfields.cover = image.url;
                console.log("*formfields", formfields);
                flag = 1;
            })
            .catch(function (err) {
                console.log();
                console.log("*** File Upload (Promise)");
                console.log("*formfields", formfields);
                flag = 1;
                if (err) { console.warn(err); }
            });
    }
    if (flag != 0) {
        await GameModel.updateGameById(req.params.id, { basePrice: formfields.basePrice, cover: formfields.cover, title: formfields.name, Description: formfields.description });
    } else {
        await GameModel.updateGameById(req.params.id, { basePrice: formfields.basePrice, title: formfields.name, Description: formfields.description });

    }
    res.redirect('/product');




    // form.parse(req, (err, fields, files) => {
    //     if (err) {
    //       next(err);
    //       return;
    //     }
    //     const coverImage =files.coverImage;
    //     if(coverImage && coverImage.size > 0){
    //         const imageName =fields.name.replace(/\s+/g, '') + "coverImg." + coverImage.name.split('.').pop() ;
    //         const oldPath = coverImage.path;
    //         const newPath =  __dirname +'/../public/images/' + imageName ;
    //         const rawData = fs.readFileSync(oldPath);
    //         fs.writeFile(newPath, rawData, function(err){ 
    //             if(err) console.log(err) 
    //         }) 

    //TODO IMPORTANT: Sửa khi quăng lên cloud 
    // fs.copyFileSync(coverImage.path, __dirname +'/../public/images/' + imageName  );
    // fs.copyFileSync(coverImage.path,'/Study/LTW/DOAN/public/images/' + imageName  );
    //}
    // const image_URI = await cloudinary.uploader.upload(__dirname +'/../public/images/'+ imageName, { public_id: fields.name.replace(/\s+/g, '') + "coverImg", folder: 'GameStore/Games', "width": 189, "height": 265 }, 
    // function(error, result) {console.log(result, error)});
    // console.log('image_URI',image_URI);
    // GameModel.updateGameByName(fields.name,
    //     { basePrice:fields.basePrice, cover: fields.cover, title: fields.name, Description: fields.description})
    //     .then(()=>{
    //         res.redirect('/product');
    //     });
    // });

    // console.log(req.body.name);
    // console.log(req.body.cover);
    // console.log(req.body.basePrice);
    // console.log(req.body.description);
    // await GameModel.updateGameByName(req.body.name,{ basePrice: req.body.basePrice, cover: req.body.cover, title: req.body.name, Description: req.body.description});
    // res.redirect('/product');
}

exports.edit = async (req, res, next) => {
    //Get from model
    const game = await GameModel.getonebyid(req.params.id);
    res.render('product/edit-product', { game });
};