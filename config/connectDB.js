const mongoose = require("mongoose")


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.db, { useNewUrlParser: true, useUnifiedTopology: true, });
        console.log("database connected successfully...")
    } catch (error) {
        console.log("database connected error...")
    }
}

module.exports = connectDB;