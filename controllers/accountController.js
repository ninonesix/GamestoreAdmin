
exports.index = (req,res,next) => {
    res.render('account/account',{ username: res.locals.user.username});
}