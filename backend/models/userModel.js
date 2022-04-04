const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type:String,
        required:[true, 'Plaeas add name']
    },
    email:{
        type:String,
        required: [true, 'Please add an email']
    },
    password: {
        type:String,
        required:[false, 'Please add password']
    }
},
{
    timestamps:true 
});

module.exports = mongoose.model('User', userSchema);