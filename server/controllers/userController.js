const User=require("../models/User"),Post=require("../models/Post");
async function getUserProfile(req,res){try{
 const user=await User.findById(req.params.id).select("name bio avatarUrl createdAt");if(!user)return res.status(404).json({message:"User not found"});
 const posts=await Post.find({author:user._id,status:"published"}).sort({createdAt:-1});res.json({user,posts});
 }catch(e){res.status(400).json({message:"Could not load profile",error:e.message});}}
module.exports={getUserProfile};
