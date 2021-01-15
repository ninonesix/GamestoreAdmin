const userModel = require('../models/userModel');
exports.index = async (req,res,next) => {
     //Get from model
    const limit = 6; //TODO: change to 10 later
    const current_page = parseInt(req.query.page) || 1;
    const users = await userModel.getUserByPage(current_page,limit);
    const userCount = await userModel.getuserCount();
    //Pagination
    const pagination = {
        page : current_page ,
        pageCount : Math.ceil(parseInt(userCount) / limit)
    }
    res.render('user/users',{users,pagination,username: res.locals.user.username});
};

