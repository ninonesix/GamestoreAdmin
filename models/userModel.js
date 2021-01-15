const {db} = require('../db/db');
const {ObjectId} = require('mongodb');

//Khai báo biến collection

//Các hàm thêm, xoá, sửa ở đây

//Hàm trả về toàn bộ các users trong collection
exports.list = async () => {
    const usercollection = db().collection('Users');
    const users = await usercollection.find({}).toArray();
    console.dir(users);
    return users;
}

//Tìm 1 user bằng name
exports.getonebyname = async (username) => {
    const usercollection = db().collection('Users');
    const user = await usercollection.findOne({name: username})
    return user;
}


// Xoá 1 user theo tên
exports.deleteuser = async(username) =>{
    const usercollection = db().collection('Users');
    const result = await usercollection.deleteOne({name: username});
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

//Tìm 1 user bằng name
exports.getonebyemail = async (email) => {
    const usercollection = db().collection('Users');
    const user = await usercollection.findOne({email: email})
    return user;
}


// Xoá 1 user theo tên
exports.deleteuserbyemail = async(email) =>{
    const usercollection = db().collection('Users');
    const result = await usercollection.deleteOne({email: email});
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

//Tìm user có tên giống vậy
exports.getbypagesamename = async(page_number, item_per_page, username) =>{
    const usercollection = db().collection('Users');
    const users = await usercollection.find({name: {$regex : username, $options: 'i'}}).skip((page_number - 1)*item_per_page).limit(item_per_page).toArray();
    return users;
}

//Lấy user theo trang
exports.getbypage = async(page_number, item_per_page )=>{
    const usercollection = db().collection('Users');
    const users = await usercollection.find({}).skip((page_number - 1)*item_per_page).limit(item_per_page).toArray();
    return users;
}

//Lấy số lượng user
exports.getuserCount = async()=>{
    const userCount = await db().collection('Users').countDocuments();
    return userCount;
}

exports.getUser = async(userId) => {
    const userCollection = db().collection('Users');
    const user = await userCollection.findOne({_id: ObjectId(userId)});
    if(user) {
        return user;
    }
    else {
        return null;
    }
}

exports.getUserByPage = async(page_number,item_per_page) => {
    const userCollection = db().collection('Users');
    const users = await userCollection.find({}).skip((page_number - 1)*item_per_page).limit(item_per_page).toArray();
    return users;
}

exports.getUser = async(userId) => {
    const userCollection = db().collection('Users');
    const user = await userCollection.findOne({_id: ObjectId(userId)});
    if(user) {
        return user;
    }
    else {
        return null;
    }
}
exports.changeUserBlocked = async(userId,blocked) => {
    let lock;
    if(blocked == true) {
        lock = false;
    } else {
        lock = true;
    }

    const userCollection = db().collection('Users');
    await userCollection.updateOne({
        _id: ObjectId(userId)
    },
    {
        $set:{blocked: lock}
    }
    )
}

