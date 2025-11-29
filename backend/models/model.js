const mongoose = require('mongoose')

const userschema = new mongoose.Schema (
    {
      username: {
        type : String,
        require : true
      },
      email : {
        type : String,
        require : true
      },
      password : {
        type : String,
        require : true
      }, 
      phone: {
        type : String ,
        require: true 
      }, 
      
      isAdmin :{
          type : Boolean,
          default : false
      }

    }
)

const user = mongoose.model('user', userschema)

module.exports = user