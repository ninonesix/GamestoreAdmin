
exports.index = (req,res,next) => {
    res.render('index',{ username: res.locals.user.username});
}