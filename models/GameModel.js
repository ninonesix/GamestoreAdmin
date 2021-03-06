const {db} = require('../db/db');
const {ObjectId} = require('mongodb');

//Khai báo biến collection

//Các hàm thêm, xoá, sửa ở đây

//Hàm trả về toàn bộ các game trong collection
exports.list = async () => {
    const gamecollection = db().collection('Our games');
    const games = await gamecollection.find({}).toArray();
    console.dir(games);
    return games;
}

//Tìm 1 game bằng title
exports.getonebytitle = async (gametitle) => {
    const gamecollection = db().collection('Our games');
    const game = await gamecollection.findOne({title: gametitle})
    return game;
}

//Tìm game bằng id
exports.getonebyid = async (gameid) => {
    const gamecollection = db().collection('Our games');
    const game = await gamecollection.findOne({_id: ObjectId(gameid)});
    return game;
}

 
// Thêm 1 game 
exports.addnewgame = async(gameinfo) =>{
    const gamecollection = db().collection('Our games');
    const result = await gamecollection.insertOne(gameinfo);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

// Xoá 1 game theo tên
exports.deletegame = async(gametitle) =>{
    const gamecollection = db().collection('Our games');
    const result = await gamecollection.deleteOne({title: gametitle});
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

// Sửa 1 game theo tên
//updateGameByName("Dragon Age II", { Price: 30$, genre: FPS });
exports.updateGameByName = async(nameOfGame, updatedInfo) =>{
    const gamecollection = db().collection('Our games');
    result = await gamecollection.updateOne({ title: nameOfGame }, { $set: updatedInfo });
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

exports.updateGameById = async(IdOfGame, updatedInfo) =>{
    const gamecollection = db().collection('Our games');
    result = await gamecollection.updateOne({ _id: ObjectId(IdOfGame) }, { $set: updatedInfo });
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

//Lấy số lượng game
exports.getGameCount = async()=>{
    const gameCount = await db().collection('Our games').countDocuments();
    return gameCount;
}

//Lấy game theo trang
exports.getbypage = async(page_number, item_per_page )=>{
    const gamecollection = db().collection('Our games');
    const games = await gamecollection.find({}).skip((page_number - 1)*item_per_page).limit(item_per_page).toArray();
    return games;
}

//Lấy số lượng game theo genre
exports.getGameCountByGenre = async(gamegenre)=>{
    // chuyển từ thể loại sang object id của thể loại
    const genreCollection = db().collection('Genres');
    const genre = await genreCollection.findOne({name: {$regex : gamegenre, $options: 'i'}});

    // lấy game từ object id thể loại
    const gamecollection = db().collection('Our games');
    const count = await gamecollection.countDocuments({category: ObjectId(genre._id)});
    return count;
}

//Lấy số lượng game theo genre
exports.getGameCountGetsamename = async(gametitle)=>{

    const gamecollection = db().collection('Our games');
    const count = await gamecollection.countDocuments({title: {$regex : gametitle, $options: 'i'}});
    return count;
}

//Tìm game có tên giống vậy
exports.getbypagesamename = async(page_number, item_per_page, gametitle) =>{
    const gamecollection = db().collection('Our games');
    const games = await gamecollection.find({title: {$regex : gametitle, $options: 'i'}}).skip((page_number - 1)*item_per_page).limit(item_per_page).toArray();
    return games;
}

//Tìm nhiều game có cùng genre
exports.getbypagesamegenre = async(page_number, item_per_page,gamegenre) =>{
    // chuyển từ thể loại sang object id của thể loại
    const genreCollection = db().collection('Genres');
    const genre = await genreCollection.findOne({name: {$regex : gamegenre, $options: 'i'}});

    // lấy game từ object id thể loại
    const gamecollection = db().collection('Our games');
    const games = await gamecollection.find({category: ObjectId(genre._id)}).skip((page_number - 1)*item_per_page).limit(item_per_page).toArray();
    return games;
}