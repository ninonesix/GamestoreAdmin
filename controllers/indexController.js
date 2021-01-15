const userModel = require('../models/userModel');
const orderModel = require('../models/orderModel');

exports.index = async(req,res,next) => {
    const user_list = await userModel.list();
    const orders = await orderModel.list();
    for(i=0;i<orders.length;i++){
        let user = await userModel.getUser(orders[i].userId);
        orders[i].username = user.name; 
    }
    let arr=[];
    const items = await orderModel.itemsInCart();
    for(i = 0;i<items.length;i++){
        const temp={
            title: items[i].item.title,
            sale: items[i].qty,
        }
        arr.push(temp);
    }
    arr.sort(function(a,b){return a.sale - b.sale});
    let arr2 = arr.slice(arr.length-10,arr.length);
    arr = arr2.reverse();
    console.log('arr:::',arr);
    
    res.render('index',{ username: res.locals.user.username,user_list,orders,arr});
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