const mongoose=require("mongoose");

const cart=mongoose.model(
   "Cart",
   mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    products:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true,
            },
            qty:{
                type:Number,
                required:true
            }
        }
    ]
   },{
      toJSON:{
        transform:function(model,ret){
            ret.cardId=ret._id.toString()
            delete ret.__id;
            delete ret._v;
        }
      }
   },{
     timestamps:true
   }
   
   )
);

module.exports={
    cart
}