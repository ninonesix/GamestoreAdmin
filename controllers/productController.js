const GameModel = require('../models/GameModel');

exports.overview = async (req,res,next) => {
    //Get from model
    const limit = 6; //TODO: change to 10 later
    const current_page = parseInt(req.query.page) || 1;
    const games = await GameModel.getbypage(current_page,limit);
    const GameCount = await GameModel.getGameCount();
    console.log('games',games);

    //Pagination
    const pagination = {
        page : current_page ,
        pageCount : Math.ceil(parseInt(GameCount) / limit)
    }

    res.render('product/product',{games,pagination});

};

exports.delete = async (req,res,next) => {
    console.log(req.body.title);
    await GameModel.deletegame(req.body.title);
    res.redirect('/product');
};

