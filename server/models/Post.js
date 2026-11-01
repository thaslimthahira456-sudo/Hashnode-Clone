const mongoose=require("mongoose");
const schema=new mongoose.Schema({title:{type:String,required:true,trim:true,maxlength:180},content:{type:String,required:true},coverImage:{type:String,default:""},tags:[{type:String,trim:true,lowercase:true}],status:{type:String,enum:["draft","published"],default:"draft"},author:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}},{timestamps:true});
module.exports=mongoose.model("Post",schema);
