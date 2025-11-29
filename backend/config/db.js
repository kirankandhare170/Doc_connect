const mongoose  = require("mongoose")
const dotenv = require("dotenv")
const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`successfully connected with backend  ${mongoose.connection.host} `)
    } catch (error) {
        console.log(`connection failed due ${error}`)
    }
      
}

module.exports = connectDb