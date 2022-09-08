const mongoose = require('mongoose');
const categoryModel = new mongoose.Schema({
    title:{
        type: String,
        unique: true,
        required: [true, 'provide category title']
    },
}, {
    collection: "category",
    timestamps: true
});

module.exports = mongoose.model("category", categoryModel)