const mongoose =require("mongoose")

const order =new mongoose.Schema({
    user:{
      type:mongoose.Types.ObjectId,
      ref:"user",
     },
     book : {
        type:mongoose.Types.ObjectId,
        ref:"books",
     },
     status : {
        type:String,
        default:"Pending",
        enum: ["Pending", "Order placed", "out of delivery", "Delivered", "Canceled"]
     },
     
},
{
    timestamps:true,
});

module.exports = mongoose.model("order",order);