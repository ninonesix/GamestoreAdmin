const GameModel = require('../models/GameModel');

exports.index = async (req,res,next) => {
    let queryString = req.originalUrl;
    let currentPage;
    let GameCount;
    let games;
    if(req.originalUrl.includes("page"))
    {
        currentPage = req.query.page;
        queryString = req.originalUrl.replace(/&page=/g,"");
        queryString = queryString.substring(0,queryString.length-1);
    }
    else
    {
        currentPage = 1;
    }
    const limit = 6 ; //TODO: change to 10 later
    const current_page = parseInt(currentPage) || 1;
    if(req.query.keyword!=null) {
        games = await GameModel.getbypagesamename(current_page,limit,req.query.keyword);
        GameCount = await GameModel.getGameCountGetsamename(req.query.keyword);
    }
    else {
        games = await GameModel.getbypagesamegenre(current_page,limit,req.query.genre);
        GameCount = await GameModel.getGameCountByGenre(req.query.genre);
    }


    let pagecount = Math.ceil(parseInt(GameCount) / limit);
    if(pagecount == 0) {
        pagecount = 1;
    }
    //Page
    const pagination = {
        page : current_page ,
        pageCount : pagecount,
        parentSub: queryString
    }
    res.render('product/product', {games, pagination, username: res.locals.user.username});
};


// exports.categories = async (req, res, next) => {
//     genre = req.route.path.substring(1,req.route.path.length);
//     console.log(genre);
//     const limit = 6 ; //TODO: change to 10 later
//     const current_page = parseInt(req.query.page) || 1;
//     const games = await GameModel.getbypagesamegenre(current_page,limit,genre);
//     const GameCount = await GameModel.getGameCountByGenre(genre);
//     let pagecount = Math.ceil(parseInt(GameCount) / limit);
//     if(pagecount == 0) {
//         pagecount = 1;
//     }
//     const pagination = {
//         page : current_page ,
//         pageCount : pagecount,
//         parentSub: ""
//     }
//     res.render('product/product', {games, pagination,username: res.locals.user.username });
//  };
