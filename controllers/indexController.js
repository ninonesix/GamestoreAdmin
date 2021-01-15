const userModel = require('../models/userModel');
const orderModel = require('../models/orderModel');
exports.index = async(req,res,next) => {
    const user_list = await userModel.list();
    const orders = await orderModel.list();
    for(i=0;i<orders.length;i++){
        let user = await userModel.getUser(orders[i].userId);
        orders[i].username = user.name; 
    }
    res.render('index',{ username: res.locals.user.username,user_list,orders});
}

exports.user = async(req,res,next) => {
    const user = await userModel.getUser(req.params.id);
    res.render('account/user',{ username: res.locals.user.username,user});
}

exports.block = async(req,res,next) => {
    const user = await userModel.getUser(req.params.id);
    await userModel.changeUserBlocked(req.params.id,user.blocked);
    if(user.blocked) {
        
        res.send({respond: false}); 
    } else {
        
        res.send({respond: true});
    }
}