
const login = (req, res) => {
   res.json({msg: "login"})
}
const register = (req, res) => {
   res.json({msg: "register"})
    
}
const getMe = (req, res) => {
   res.json({msg: "my profile"})
}

module.exports = {
    login, 
    register,
    getMe
}