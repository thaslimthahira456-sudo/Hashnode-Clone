const r=require("express").Router(),{registerUser,loginUser}=require("../controllers/authController");
r.post("/register",registerUser);r.post("/login",loginUser);module.exports=r;
