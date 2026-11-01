const jwt=require("jsonwebtoken");
module.exports=function protect(req,res,next){
 const h=req.headers.authorization||"", token=h.startsWith("Bearer ")?h.slice(7):null;
 if(!token)return res.status(401).json({message:"Not authorized: token missing"});
 try{req.userId=jwt.verify(token,process.env.JWT_SECRET).userId;next();}
 catch{return res.status(401).json({message:"Not authorized: invalid or expired token"});}
};
module.exports.optionalAuth = function (req, res, next) {
  const h = req.headers.authorization || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : null;

  if (!token) return next();

  try {
    req.userId = require("jsonwebtoken").verify(
      token,
      process.env.JWT_SECRET
    ).userId;
  } catch {
    // Ignore invalid tokens for public post viewing.
  }

  next();
};