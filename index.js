const express =require("express");
const app=express();
const cors = require("cors");
const mongoose =require("mongoose");
const {MONGO_DB_CONFIG}=require("./config/app.config");
const errors=require("./middleware/error.js");
const swaggerUi=require("swagger-ui-express"),swaggerDocument=require("./swagger.json");

console.log(mongoose.version);
// const swaggerUij=require("swagger-ui-express"),swaggerDocumentj=require("./swaggerProduct.json");
// const category=require("./controllers/categories.controller.js");
// const product=require("./controllers/products.controller.js");
// const category =require("../services/categories.service.js");

mongoose.Promise=global.Promise;
mongoose
        .connect(MONGO_DB_CONFIG.DB,{
         useNewUrlParser:true,
         useUnifiedTopology:true})

         .then(()=>{
            console.log("Database connected");
         },
         (error)=>{
            console.log("Database can't be connected:"+error);

            })
app.use(cors());
app.use(express.json());
app.use("/uploads",express.static("uploads"));
app.use("/api",require("./routes/app.routes"));
app.use(errors.errorHandler);
app.use("/api~docs",swaggerUi.serve,swaggerUi.setup(swaggerDocument));
// app.use("/api~docs",swaggerUij.serve,swaggerUij.setup(swaggerDocumentj));
// app.use(product.create);
// app.use(category.create);

app.listen(process.env.port || 4000,function(){
    console.log("Ready to Go");
});
