const mongoose=require("mongoose");
module.exports=async function connectDB(){
 if(!process.env.MONGO_URI)throw new Error("MONGO_URI missing. Create server/.env from .env.example");
 const c=await mongoose.connect(process.env.MONGO_URI,{serverSelectionTimeoutMS:12000});
 console.log("MongoDB connected:",c.connection.host);
};
