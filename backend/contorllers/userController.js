const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const login = (req, res) => {
    const {email, password}  = req.body;
    try {


       res.json({email});
 
   } catch (error) {
       console.log(error);
       res.status(400).json({err: error.message});
   }  
   res.json({msg: "login"})
}

const register = async (req, res) => {
   const {name, email, password}  = req.body;
   try {
      const salt = await bcrypt.genSalt(10) ;
      const hashedPassword = await bcrypt.hash(password, salt);
      const token = generateToken(email) ;
      res.json({name, email, hashedPassword, token});

  } catch (error) {
      console.log(error);
      res.status(400).json({err: error.message});
  }

}

const getMe = (req, res) => {
   res.json({msg: "my profile"})
}

const generateToken = (email) =>{
    return jwt.sign({email}, process.env.JWT_SECRET_KEY, {expiresIn:"30d"});
}


module.exports = {
    login, 
    register,
    getMe
}