const userModel = require('../models/userModel');

exports.index = async(req,res,next) => {
    const user_list = await userModel.list();
    res.render('index',{ username: res.locals.user.username,user_list});
}

exports.user = async(req,res,next) => {
    const user = await userModel.getUser(req.params.id);
    res.render('account/user',{ username: res.locals.user.username,user});
}