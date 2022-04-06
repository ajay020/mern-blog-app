const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        required:[true],
        ref: 'User'
    },
    username:{
        type:String, 
        required:[true, 'Please add user name']
    },
    title: {
        type:String,
        required:[true, 'Plaeas add name']
    },
    content:{
        type:String,
    },
    upvotes:{
        type: [mongoose.Types.ObjectId],
    }
},
{
    timestamps:true 
});

module.exports = mongoose.model('Post', postSchema);