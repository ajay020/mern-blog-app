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
        required:[true, 'Please add password']
    }
},
{
    timestamps:true 
});

module.exports = userSchema.model('User', userSchema);