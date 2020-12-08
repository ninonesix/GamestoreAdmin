const formidable = require('formidable');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const GameModel = require('../models/GameModel');

exports.addproduct = async(req,res,next)=>{
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
    const imageName =formfields.title.replace(/\s+/g, '') + "coverImg." + coverImage.name.split('.').pop() ;

    if(coverImage && coverImage.size > 0){
        const oldPath = coverImage.path;
        const newPath =  __dirname +'/../public/images/' + imageName ;
        const rawData = fs.readFileSync(oldPath);
        fs.writeFile(newPath, rawData, function(err){ 
            if(err) console.log(err) 
        }) 
    }

    cloudinary.uploader.upload( __dirname +'/../public/images/' + imageName, { public_id: formfields.title.replace(/\s+/g, '') + "coverImg",folder: 'GameStore/Games',unique_filename:false,overwrite:true, "width": 189, "height": 265 })
    .then(function (image) {
        console.log();
        console.log("** File Upload (Promise)");
        console.log("* public_id for the uploaded image is generated by Cloudinary's service.");
        console.log("* " + image.public_id);
        console.log("* " + image.url);
        formfields.cover = image.url;
        console.log("*formfields",formfields);
        GameModel.addnewgame(formfields);
        res.redirect('/product');
    })
    .catch(function (err) {
        console.log();
        console.log("*** File Upload (Promise)");
        console.log("*formfields",formfields);
        if (err) { console.warn(err); }
    });


}

exports.add = (req,res,next) => {
    res.render('product/add-product');
};