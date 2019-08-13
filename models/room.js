/*
Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema(
{
    title: 
    { 
        type:String,
        required:true 
    },
    address: 
    { 
        type:String,
        required:true 
        },
    city: 
    { 
        type:String,
        required:true 
    },
    price: 
    { 
        type:Number,
        required:true 
        },
    owner: 
    { 
        type:String,
        required:true 
    },
    amenities1: 
    { 
        type:String,
        required:true 
    },
    amenities2: 
    { 
        type:String,
        required:true 
    },
    amenities3: 
    { 
        type:String,
        required:true 
    },
    amenities4: 
    { 
        type:String,
        required:true 
    },
    amenities5: 
    { 
        type:String,
        required:true 
    },
    description:
    { 
        type:String,
        required:true
    },
    image:
    { 
        type:String,
        required:true
    },
    // roomid:
    // {
    //     type:Object,
    //     required:true
    // }
});

module.exports=roomSchema;