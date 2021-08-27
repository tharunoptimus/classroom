const mongoose = require("mongoose")
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useUnifiedTopology', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
class Database {

    constructor() {
        this.connect();
    }

    connect() {
        mongoose.connect("mongodb+srv://meowman:meowman@classroomcluster.1h83g.mongodb.net/classroomCluster?retryWrites=true&w=majority")
        .then(() => {
            console.log("Database Connection Successful!");
        })
        .catch((err) => {
            console.log("Database Connection Failed!" + err);
        })
    }
}

module.exports = new Database();
