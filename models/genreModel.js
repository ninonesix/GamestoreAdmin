const {db} = require('../db/db');
const {ObjectId} = require('mongodb');

//Khai báo biến collection

//Các hàm thêm, xoá, sửa ở đây

//Hàm trả về toàn bộ các genre trong collection
exports.list = async () => {
    const genrecollection = db().collection('Genres');
    const genres = await genrecollection.find({}).toArray();
    console.dir(genres);
    return genres;
}

exports.findgenrebyname = async(genrename) =>{
    const genrecollection = db().collection('Genres');
    const genre = await genrecollection.findOne({ name: { $regex : genrename, $options: 'i'}});
    return genre;
}