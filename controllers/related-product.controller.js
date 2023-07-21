const {
    addRelatedProduct,
    removeRelatedProduct
}= require("C:\\Users\\Dell\\Documents\\Andriod_project\\Grocery App\\services\\related-products.services.js");
// const { productId } = req.params;
// const { relatedProductId } = req.body;
exports.create = (req, res, next) => {
    console.log("req.body :"+req.body.body);
    console.log("req.body :"+req.params);
    addRelatedProduct(req.body, (error, results) => {
                if (error) {
                    return next(error);
                }
                    return res.status(200).send({
                        message: "Success",
                        data: results,
                    });
            });
        };

exports.delete = (req, res, next) =>  {
            var model={
                id:req.params.id,
            };
        
            removeRelatedProduct(model, (error, results) => {
                if (error) {
                    return next(error);
                }
                else{
                        return res.status(200).send({
                        message: "Success",
                        data: results,
                    });
                }
            });
        };