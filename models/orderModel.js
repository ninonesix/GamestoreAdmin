const {db} = require('../db/db');
const {ObjectId} = require('mongodb');


exports.list = async () => {
    const cartcollection = db().collection('Carts');
    const orders = await cartcollection.find({}).toArray();
    return orders;
}