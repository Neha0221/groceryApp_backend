const cartService = require("../services/cart.service");

exports.create=(req,res,next)=>{
    var model={
        userId:req.user.userId,
        products:req.body.products
    };
    
    cartService.addCart(model,(error,results)=>{
        if(error){
            return next(error);
        }
            return res.status(200).send({
            message:"Success",
            data:results,
       });
    });
}

exports.findAll=(req,res,next)=>{
     console.log("res : "+res);
    // console.log("req.user : "+req.user);
    // console.log("req.user.Id : "+req.user.userId);
    console.log(res.status)
    cartService.getCart({userId:req.user.userId},(error,results)=>{
        console.log("result : "+results);
        console.log("error : "+error);
        if(error){
            // console.log("error : "+error);
            return next(error);
        }
        
            return res.status(200).send({
            message:"Success",
            data:results,
       });
    });
}

exports.delete=(req,res,next)=>{
    var model={
        userId:req.user.userId,
        productId:req.body.productId,
        qty:req.body.qty
    };
    
    cartService.removeCartItem(model,(error,results)=>{
        if(error){
            return next(error);
        }
            return res.status(200).send({
            message:"Success",
            data:results
       });
    });
}
 