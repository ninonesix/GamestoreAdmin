const GameModel = require('../models/GameModel');

//updateGameByName("Dragon Age II", { Price: 30$, genre: FPS });
exports.editproduct = async(req,res,next)=>{
    console.log("hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    console.log(req.body.name);
    console.log(req.body.cover);
    console.log(req.body.basePrice);
    console.log(req.body.description);
    await GameModel.updateGameByName(req.body.name,{ basePrice: req.body.basePrice, cover: req.body.cover, title: req.body.name, Description: req.body.description});
    res.redirect('/product');
}

exports.edit = async (req,res,next) => {
    //Get from model
    const game = await GameModel.getonebyid(req.params.id);
    res.render('product/edit-product',{game});
};