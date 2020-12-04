const GameModel = require('../models/GameModel');

exports.overview = async (req,res,next) => {
    //Get from model
    const games = await GameModel.list();
    console.log('games',games);
    res.render('product/product',{games});
};

exports.delete = async (req,res,next) => {
    console.log(req.body.title);
    await GameModel.deletegame(req.body.title);
    res.redirect('/product');
};

