const {db} = require('../db/db');
const {ObjectId} = require('mongodb');
const bcrypt = require('bcrypt');


exports.getAdmin = async(userId) => {
    const adminCollection = db().collection('Admins');
    const admin = await adminCollection.findOne({_id: ObjectId(userId)});
    if(admin) {
        return admin;
    }
    else {
        return null;
    }
}

exports.updateById = async(userId,updatedInfo)=>{
    const adminCollection = db().collection('Admins');
    result = await adminCollection.updateOne({ _id: ObjectId(userId) }, { $set: updatedInfo });
}

//Kiểm tra thông tin user hợp lệ để đăng nhập
exports.checkCredential = async(username,password) => {
    const admin = await db().collection('Admins').findOne({username: username});
    let bpassword = null;
    if(admin)
    {
        bpassword = await bcrypt.compare(password,admin.password);
    }
    else
    {
        return null;
    }
    if(bpassword)
    {
        return admin;
    }
    else
    {
        return null;
    }
}