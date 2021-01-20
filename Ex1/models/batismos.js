const mongoose = require("mongoose");


const batismosSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    _id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    ref: {
        type: String,
        required: true,
    },
    href: {
        type: String,
        required: true,
    },
    mae: {
        type: String,
        required: true,
    },
    pai: {
        type: String,
        required: true,
    },
    
});



const Batismos = mongoose.model("batizados", batismosSchema, "batizados");

module.exports = Batismos;
