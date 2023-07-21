 const { user }=require("../models/user.model");
 const bcrypt=require("bcryptjs");
 const auth=require("../middleware/auth");
const { use } = require("../routes/app.routes");
const { response } = require("express");

 async function login({email,password},callback){
    const userModel=await user.findOne({email});

    if(userModel!=null){
        if(bcrypt.compareSync(password,userModel.password)){
            const token=auth.generateAccessToken(userModel.toJSON());
            return callback(null,{...userModel.toJSON(),token});
        }else{
            return callback({
                message:"Invalid Email/Password"
            });
        }
    }
    else{
    return callback({
        message:"Invaild Email/Password"
     });
    }
 }

 async function register(params,callback){
    console.log(`register:${JSON.stringify(params)}`);
    if(params.email===undefined){
        return callback({
            message:"Email Required!"
        });
    }

    let isUserExist=await user.findOne({email:params.email});
    if(isUserExist){
        return callback({
        message:"Email already Register!"
        });
    }
    const salt=bcrypt.genSaltSync(10);
    params.password=bcrypt.hashSync(params.password,salt); 

    const userSchema=new user(params);
    userSchema.save()
        .then((response)=>{
            return callback(null,response);
        })
    .catch((error)=>{
        console.log('err2:'+error);
        return callback(error);
    });
 }

 module.exports={
    login,
    register 
 }