const r=require("express").Router(),c=require("../controllers/postController"),protect=require("../middleware/authMiddleware");
r.get("/",c.getPosts);r.get("/mine",protect,c.getMyPosts);r.get("/:id",require("../middleware/authMiddleware").optionalAuth,c.getPostById);
r.post("/",protect,c.createPost);r.put("/:id",protect,c.updatePost);r.delete("/:id",protect,c.deletePost);
module.exports=r;
