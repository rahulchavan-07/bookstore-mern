const mongoose=require('mongoose');

const connection = async ()=>{

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to mongoDB")
    }
    catch(error) {
        console.log(error);
    }
}
module.exports = connection;

