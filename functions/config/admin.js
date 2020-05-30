const mongoose = require("mongoose")
const url = "mongodb://localhost:27017"

mongoose.Promise = global.Promise

mongoose.connect(url, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true
})

exports.connectDB =  () => {
    mongoose.connection
    .on('error', console.error.bind(console, 'connection error'))
    .once('open', ()=> {
        console.log('Connection Successful!')
    });

    // beforeEach((done) => {
    //     mongoose.connection.collections.users.drop(() => {
    //         done();
    //     })
    // })   

}

