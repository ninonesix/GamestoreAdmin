const formidable = require('formidable');
const fs = require('fs');

const GameModel = require('../models/GameModel');

//updateGameByName("Dragon Age II", { Price: 30$, genre: FPS });
exports.editproduct = (req,res,next)=>{
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        if (err) {
          next(err);
          return;
        }
        const coverImage =files.coverImage;
        if(coverImage && coverImage.size > 0){
            const imageName =fields.name.replace(/\s+/g, '') + "coverImg." + coverImage.name.split('.').pop() ;
            //TODO IMPORTANT: Sửa khi quăng lên cloud 
            fs.copyFileSync(coverImage.path, __dirname +'/../public/images/' + imageName  );
            fs.copyFileSync(coverImage.path,'/Study/LTW/DOAN/public/images/' + imageName  );
            fields.cover = '/images/'+ imageName;
        }
        
        GameModel.updateGameByName(fields.name,
            { basePrice:fields.basePrice, cover: fields.cover, title: fields.name, Description: fields.description})
            .then(()=>{
                res.redirect('/product');
            });
    });

    // console.log(req.body.name);
    // console.log(req.body.cover);
    // console.log(req.body.basePrice);
    // console.log(req.body.description);
    // await GameModel.updateGameByName(req.body.name,{ basePrice: req.body.basePrice, cover: req.body.cover, title: req.body.name, Description: req.body.description});
    // res.redirect('/product');
}

exports.edit = async (req,res,next) => {
    //Get from model
    const game = await GameModel.getonebyid(req.params.id);
    res.render('product/edit-product',{game});
};