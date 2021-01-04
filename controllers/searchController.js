const GameModel = require('../models/GameModel');

exports.index = async (req,res,next) => {
    //Get from model
    // const limit = 6; //TODO: change to 10 later
    // const current_page = parseInt(req.query.page) || 1;
    // const games = await GameModel.getbypagesamename(current_page,limit,req.query.keyword);
    // const GameCount = await GameModel.getGameCount();
    // console.log('games',games);

    // //Pagination
    // const pagination = {
    //     page : current_page ,
    //     pageCount : Math.ceil(parseInt(GameCount) / limit)
    // }

    // res.render('product/product',{games,pagination});

    //
    let queryString = req.originalUrl;
    let currentPage;
    if(req.query.keyword!=null && req.originalUrl.includes("&page="))
    {
        currentPage = req.originalUrl.charAt(req.originalUrl.length - 1 )
        queryString = req.originalUrl.replace(/&page=/g,"")
        queryString = queryString.substring(0,queryString.length-1);
    }
    else
    {
        currentPage = 1;
    }
    const limit = 6 ; //TODO: change to 10 later
    const current_page = parseInt(currentPage) || 1;
    const games = await GameModel.getbypagesamename(current_page,limit,req.query.keyword);
    const GameCount = await GameModel.getGameCountGetsamename(req.query.keyword);

    console.log(GameCount);
    page = Math.ceil(parseInt(GameCount) / limit);
    console.log(page);
    //Page
    const pagination = {
        page : current_page ,
        pageCount : Math.ceil(parseInt(GameCount) / limit),
        parentSub: queryString
    }
    res.render('product/product', {games, pagination});
};


exports.categories = async (req, res, next) => {
    genre = req.route.path.substring(1,req.route.path.length);
    console.log(genre);
    const limit = 6 ; //TODO: change to 10 later
    const current_page = parseInt(req.query.page) || 1;
    const games = await GameModel.getbypagesamegenre(current_page,limit,genre);
    const GameCount = await GameModel.getGameCountByGenre(genre);
    const pagination = {
        page : current_page ,
        pageCount : Math.ceil(parseInt(GameCount) / limit)
    }
    res.render('product/product', {games, pagination,username: res.locals.user.username });
 };
