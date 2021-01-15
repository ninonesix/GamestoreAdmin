const GameModel = require('../models/GameModel');
const OrderModel = require('../models/orderModel');
exports.overview = async (req,res,next) => {
    //Get from model
    const limit = 6; //TODO: change to 10 later
    const current_page = parseInt(req.query.page) || 1;
    const games = await GameModel.getbypage(current_page,limit);
    const GameCount = await GameModel.getGameCount();
    const items = await OrderModel.itemsInCart();
    for(i=0;i<games.length;i++){
        games[i].sale = 0;
        for(j=0;j<items.length;j++){
            if(items[j].item.title == games[i].title){
                games[i].sale = items[j].qty;
                break;
            }
        }
    }
    //Pagination
    const pagination = {
        page : current_page ,
        pageCount : Math.ceil(parseInt(GameCount) / limit)
    }
    res.render('product/product',{games,pagination,username: res.locals.user.username});

};

exports.delete = async (req,res,next) => {
    await GameModel.deletegame(req.body.title);
    res.render('product/product',{ username: res.locals.user.username});
};

