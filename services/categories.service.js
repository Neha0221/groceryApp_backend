const { category } = require("../models/category.model");
const { MONGO_DB_CONFIG } = require("../config/app.config");
const { product } = require("../models/product.model");

async function createCategory(params, callback) {
    if (!params.categoryName) {
        return callback(
            {
                message: "Category Name Required",
            },
            "");
    }

    const model = new category(params);
    model
        .save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}


async function getCategories(params, callback) {
    const categoryName = params.categoryName;
    console.log("categoryName :" + categoryName);
    var condition = categoryName
        ? {
            categoryName: { $regex: new RegExp(categoryName), $options: "i" },

        }

        : {};
    temp = ['648767923b3ac221d50ae783','6488588445b0394abd95069b','6488aa738c0a1549a20a6575','648a181835d90d57f5e04472','648df03c8b44bdc24ca512fa'];
    for (var i = 0; i < temp.length; i++)
    {
        category.findByIdAndDelete(temp[i]);
    }

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
    let page = (Math.abs(params.page) || 1) - 1;

    category
        .find(condition, "categoryName categoryImage")
        .limit(perPage)
        .skip(page * perPage)
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}



async function getCategoryById(params, callback) {
    const categoryId = params.categoryName;
    var condition = categoryName

    category
        .findbyId(categoryId)
        .then((response) => {
            if (!response) callback("Not Found Category with Id" + categoryId)
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}


async function updateCategory(params, callback) {
    const categoryId = params.categoryName;
    var condition = categoryName

    category
        .findByIdAndUpdate(categoryId, params, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("Not Found Category with Id" + categoryId)
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function deleteCategory(params, callback) {
    const categoryId = params.categoryName;
    var condition = categoryName

    category
        .findByIdAndDelete(categoryId)
        .then((response) => {
            if (!response) callback("Not Found Category with Id" + categoryId)
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory

};

