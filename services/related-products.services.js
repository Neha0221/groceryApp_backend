const { relatedProduct } = require("../models/related-products.model");
const { product } = require("../models/product.model");
const { model } = require("mongoose");
const { MONGO_DB_CONFIG } = require("../config/app.config");

async function addRelatedProduct(params, callback) {
    console.log("params :"+params);
    if (!params.product) {
        return callback(
            {
                message: "Product Id Required",
            }
            );
    }

    if (!params.relatedProduct) {
        return callback(
            {
                message: "Related Product Id Required",
            }
            );
    }
    const relatedProductModel = new relatedProduct(params);
    relatedProductModel
        .save()
        .then(async(response) => {
            await product.findOneAndUpdate(
                {
                    _id:params.product
                },
                {
                    $addToSet: {
                    "relatedProducts":relatedProductModel
                }
             }
            );
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function removeRelatedProduct(params, callback) {
    const id = params.id;
        relatedProduct.findByIdAndRemove(id)
        .then((response) => {
            if (!response) callback("Not Found Product Id");
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports={
    addRelatedProduct,
    removeRelatedProduct
}
