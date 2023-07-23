const jwt=require("jsonwebtoken");

const TOKEN_KEY="RANDOM_KEY";

function authenticateToken(req,res,next){
    const authHeader=req.headers['authorization'];
    console.log("au:"+authHeader);
    const token=authHeader && authHeader.split(' ')[1];
    console.log("ans:"+token);

    // if(token==null) return res.sendStatus(401);
    if(!token){
        return res.status(403).send({message:"No Token Provided!"});
    }
    jwt.verify(token,TOKEN_KEY,(err,user)=>{
        if(err) return res.status(401).send({message:"Unauthorized!"});
        req.user=user.data;
        // console.log("return :"+req.data);
        next();
    });
}

function generateAccessToken(userModel){
    return jwt.sign({data:userModel},TOKEN_KEY,{
        expiresIn:"1h"
    });
}

module.exports={
    authenticateToken,
    generateAccessToken,
};