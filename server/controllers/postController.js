const mongoose=require("mongoose"),Post=require("../models/Post");
const tags=t=>Array.isArray(t)?[...new Set(t.map(x=>String(x).trim().toLowerCase()).filter(Boolean))].slice(0,10):[];
async function createPost(req,res){try{
 const {title,content,coverImage="",tags:ts=[],status="draft"}=req.body;
 if(!title?.trim()||!content?.trim())return res.status(400).json({message:"Title and content are required"});
 if(!["draft","published"].includes(status))return res.status(400).json({message:"Invalid status"});
 const p=await Post.create({title:title.trim(),content,coverImage,tags:tags(ts),status,author:req.userId});await p.populate("author","name avatarUrl");
 res.status(201).json({message:"Post created successfully",post:p});
 }catch(e){res.status(500).json({message:"Failed to create post",error:e.message});}}
async function getPosts(req,res){try{
 const f={status:"published"}, {search="",tag=""}=req.query;if(tag.trim())f.tags=tag.trim().toLowerCase();
 if(search.trim()){const s=search.trim().replace(/[.*+?^${}()|[\]\\]/g,"\\$&");f.$or=[{title:{$regex:s,$options:"i"}},{content:{$regex:s,$options:"i"}}];}
 const posts=await Post.find(f).populate("author","name avatarUrl").sort({createdAt:-1}).limit(100);res.json({count:posts.length,posts});
 }catch(e){res.status(500).json({message:"Failed to fetch posts",error:e.message});}}
async function getMyPosts(req,res){try{const posts=await Post.find({author:req.userId}).populate("author","name avatarUrl").sort({updatedAt:-1});res.json({count:posts.length,posts});}catch(e){res.status(500).json({message:"Failed to fetch your posts",error:e.message});}}
async function getPostById(req,res){try{
 if(!mongoose.isValidObjectId(req.params.id))return res.status(400).json({message:"Invalid post ID"});
 const p=await Post.findById(req.params.id).populate("author","name avatarUrl bio");if(!p)return res.status(404).json({message:"Post not found"});
 if(p.status==="draft"&&String(p.author._id)!==String(req.userId||""))return res.status(404).json({message:"Post not found"});
 res.json({post:p});
 }catch(e){res.status(500).json({message:"Failed to fetch post",error:e.message});}}
async function updatePost(req,res){try{
 if(!mongoose.isValidObjectId(req.params.id))return res.status(400).json({message:"Invalid post ID"});
 const p=await Post.findById(req.params.id);if(!p)return res.status(404).json({message:"Post not found"});
 if(String(p.author)!==String(req.userId))return res.status(403).json({message:"You can only edit your own posts"});
 const {title,content,coverImage,tags:ts,status}=req.body;
 if(title!==undefined){if(!String(title).trim())return res.status(400).json({message:"Title cannot be empty"});p.title=String(title).trim();}
 if(content!==undefined){if(!String(content).trim())return res.status(400).json({message:"Content cannot be empty"});p.content=content;}
 if(coverImage!==undefined)p.coverImage=coverImage;
 if(ts!==undefined){if(!Array.isArray(ts))return res.status(400).json({message:"Tags must be an array"});p.tags=tags(ts);}
 if(status!==undefined){if(!["draft","published"].includes(status))return res.status(400).json({message:"Invalid status"});p.status=status;}
 await p.save();await p.populate("author","name avatarUrl");res.json({message:"Post updated successfully",post:p});
 }catch(e){res.status(500).json({message:"Failed to update post",error:e.message});}}
async function deletePost(req,res){try{
 if(!mongoose.isValidObjectId(req.params.id))return res.status(400).json({message:"Invalid post ID"});
 const p=await Post.findById(req.params.id);if(!p)return res.status(404).json({message:"Post not found"});
 if(String(p.author)!==String(req.userId))return res.status(403).json({message:"You can only delete your own posts"});
 await p.deleteOne();res.json({message:"Post deleted successfully"});
 }catch(e){res.status(500).json({message:"Failed to delete post",error:e.message});}}
module.exports={createPost,getPosts,getMyPosts,getPostById,updatePost,deletePost};
