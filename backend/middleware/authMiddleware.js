const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const protect = async(req, res, next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //get token from header
            token = req.headers.authorization.split(' ')[1];
            //verify token
            const decoded =  jwt.verify(token,process.env.JWT_SECRET_KEY);
            // get user from token
            req.user = await User.findById(decoded.id).select("-password");
            // console.log(decoded, req.user);
            next();

        } catch (error) {
            console.log(error);
            res.status(401).json({err: error});
        }
    }

    if(!token){
        res.status(400).json({err: 'No token, no authorization'});
    }
}

module.exports = protect;