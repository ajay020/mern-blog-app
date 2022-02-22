const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    // user:{
    //     type: mongoose.Types.ObjectId,
    //     required:[true],
    //     ref: 'User'
    // },
    title: {
        type:String,
        required:[true, 'Plaeas add name']
    },
    content:{
        type:String,
    },
},
{
    timestamps:true 
});

module.exports = mongoose.model('Post', postSchema);