const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = (req, res, next) => {
    const header = req.get('Authorization');
    if(!header){
        req.isAuth = false;
        return next();
    }

    const token = header.split(' ')[1];
    if(!token || token === ''){
        req.isAuth = falst;
        return next();
    }

    let decodedToken;
    try{
        decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
    }catch(err){
        req.isAuth = false;
        return next();
    }
    if(!decodedToken){
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.userId = decodedToken.userId;
    next();

}