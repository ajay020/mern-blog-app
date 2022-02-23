const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const login = async (req, res) => {
    const {email, password}  = req.body;
    try {
        const user = await User.findOne({email});

        if(user && (await bcrypt.compare(password, user.password))){
            res.status(201).json({
                _id: user.id, 
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        }else{
           return res.status(400).json({msg: "Invalid credentails"});
        }

   } catch (error) {
       console.log(error);
       res.status(400).json({err: error.message});
   }  
}

const register = async (req, res) => {
   const {name, email, password}  = req.body;

   if(!name || !email || !password){
       return res.status(400).json({msg: "Please add all fields"});
   }

   try {
       const existedUser = await User.findOne({email});
       if(existedUser){
           return res.status(400).json({msg: "User is already exist!"});
       }

      const salt = await bcrypt.genSalt(10) ;
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({name, email, password: hashedPassword});

      res.json({id:user.id, name:user.name, email: user.email ,token : generateToken(user._id)});

  } catch (error) {
      console.log(error);
      res.status(400).json({err: error.message});
  }

}

const getMe = async(req, res) => {
    try {
        const {_id, name, email} = await User.findById(req.user.id);
        return res.status(201).json({
            id: _id,
            name, 
            email 
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({err: error.message});
    }
}

const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET_KEY, {expiresIn:"30d"});
}


module.exports = {
    login, 
    register,
    getMe
}