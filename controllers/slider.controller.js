const sliderService = require("../services/sliders.service");
const upload = require("../middleware/slider.upload");

exports.create = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            next(err);
        }
        else {
            const path =
                req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

            var model = {
                sliderName: req.body.sliderName,
                sliderDescription: req.body.sliderDescription,
                sliderImage: path != "" ? "/" + path : "",
            };
            console.log('model :'+model);
            console.log('model_sliderName :'+model.sliderName);
            console.log('model_sliderDescription :'+model.sliderDescription);
            console.log('model_sliderImage:'+model. sliderImage);

            sliderService.createSlider(model, (error, results) => {
                if (error) {
                    console.log("error : "+error);
                    return next(error);
                    
                }
                
                else {
                    console.log("result : "+results);
                    return res.status(200).send({
                        message: "Success",
                        data: results,
                    });
                }

            });

        }
    });
};

exports.findAll = (req, res, next) => {
    var model = {
        sliderName: req.query.sliderName,
        pageSize: req.query.pageSize,
        page: req.query.page,
    };
    sliderService.getSliders(model, (error, results) => {
        if (error) {
            return next(error);
        }
        else {
            return res.status(200).send({
                message: "Success",
                data: results,
            });
        }

    });

};
exports.findOne = (req, res, next) => {
    var model = {
        sliderId: req.query.sliderId,
    };
    categoriesService.getSliderById(model, (error, results) => {
        if (error) {
            return next(error);
        }
        else {
            return res.status(200).send({
                message: "Success",
                data: results,
            });
        }

    });

};

exports.update = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            next(err);
        }
        else {
            const path =
                req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

            var model = {
                sliderId: req.params.id,
                sliderName:req.body.sliderName,
                sliderDescription: req.body.sliderDescription,
                sliderImage: path != "" ? "/" + path : "",
            };
            sliderService.updateSlider(model, (error, results) => {
                if (error) {
                    return next(error);
                }
                else {
                    return res.status(200).send({
                        message: "Success",
                        data: results,
                    });
                }

            });
        }
    });
};

exports.delete = (req, res, next) => {
    var model = {
        sliderId: req.params.id,
    };
    sliderService.deleteSlider(model, (error, results) => {
        if (error) {
            return next(error);
        }
        else {
            return res.status(200).send({
                message: "Success",
                data: results,
            });
        }

    });

};