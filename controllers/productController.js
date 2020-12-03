exports.overview = (req,res,next) => {
    res.render('product/product');
}

exports.add = (req,res,next) => {
    res.render('product/add-product');
}

exports.edit = (req,res,next) => {
    res.render('product/edit-product');
}