const mongoose =require("mongoose");

const slider=mongoose.model("Sliders",
mongoose.Schema(
    {
        sliderName:{
            type:String,
            require:true,
            unique:true
        },

        sliderDescription:{
            type:String,
            require:false
        },

        sliderURL:{
            type: String,
            require : false
        },

        sliderImage:{
            type:String,
            require:true
        }
    }
)

);

module.exports={
    slider
}