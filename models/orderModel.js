const { db } = require('../db/db');
const { ObjectId } = require('mongodb');


exports.list = async () => {
    const cartcollection = db().collection('Carts');
    const orders = await cartcollection.find({}).toArray();
    return orders;
}

exports.itemsInCart = async () => {
    const cartcollection = db().collection('Carts');
    const orders = await cartcollection.find({}).toArray();
    let arr = [];
    for (i = 0; i < orders.length; i++) {
        for (let id in orders[i].items) {
            arr.push(orders[i].items[id]);
        }
    }
    return arr;
}