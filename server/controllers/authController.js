const bcrypt=require("bcryptjs"),jwt=require("jsonwebtoken"),User=require("../models/User");
const safe=u=>({id:u._id,name:u.name,email:u.email,bio:u.bio,avatarUrl:u.avatarUrl});
const token=id=>jwt.sign({userId:String(id)},process.env.JWT_SECRET,{expiresIn:"1d"});
async function registerUser(req,res){try{
 const {name,email,password}=req.body;if(!name?.trim()||!email?.trim()||!password)return res.status(400).json({message:"Name, email and password are required"});
 if(password.length<8)return res.status(400).json({message:"Password must be at least 8 characters"});
 const e=email.toLowerCase().trim();if(await User.findOne({email:e}))return res.status(409).json({message:"Email already registered"});
 const u=await User.create({name:name.trim(),email:e,password:await bcrypt.hash(password,12)});
 res.status(201).json({message:"Account created",token:token(u._id),user:safe(u)});
 }catch(e){res.status(500).json({message:"Could not register user",error:e.message});}}
async function loginUser(req,res){try{
 const {email,password}=req.body;if(!email||!password)return res.status(400).json({message:"Email and password required"});
 const u=await User.findOne({email:email.toLowerCase().trim()}).select("+password");
 if(!u||!(await bcrypt.compare(password,u.password)))return res.status(401).json({message:"Invalid email or password"});
 res.json({message:"Login successful",token:token(u._id),user:safe(u)});
 }catch(e){res.status(500).json({message:"Could not log in",error:e.message});}}
module.exports={registerUser,loginUser};
