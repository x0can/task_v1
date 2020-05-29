const mongoose = require("mongoose")

exports.connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true,
            useNewUrlParser: true
        })

        console.log(`Db connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
}

