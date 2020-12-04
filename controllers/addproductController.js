const GameModel = require('../models/GameModel');

exports.addproduct = async(req,res,next)=>{
    console.log(req.body);
    await GameModel.addnewgame(req.body);
    res.redirect('/product');

}

exports.add = (req,res,next) => {
    res.render('product/add-product');
};