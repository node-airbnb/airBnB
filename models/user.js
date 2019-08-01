 /*
Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
{
    email:
  { 
    type: String,
    required:true,
    
  },

  firstName:
  { 
    type: String,
    required:true,
    
  },
  lastName:
  { 
    type: String,
    required:true,
  },

  username:
  {
    type: String,
    required:true, 
  },

  password:
  {
    type: String,
    required:true, 
  },

});

module.exports=userSchema;