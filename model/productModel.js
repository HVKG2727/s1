const mongoose = require('mongoose');
const productModel = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'please provide product title'],
        trim: true,
        unique: true,
        maxlength: [100, 'Name cannot be more than 100 char`s.....']
    },
    category: {
        type: String,
        required: [true, 'please provide category']
    },
    price: {
        type: Number,
        required: [true, "please provide price"]
    },
    quantity: {
        type: String,
        required: [true, "Please PRovide quantity"]
    },
    desc: {
        type: String,
        required: [true, 'please provide desc']
    },
    image: {
        type: Object,
        required: [true, 'please provide image object']
    },
    stock: {
        type: Number,
        required: [true, "please"]
    },
    sold: {
        type: Number,
        default: 0
    },
    freeShipping: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Array,
        default: []
    },
}, {
    collection: "products",
    timestamps: true
})

module.exports  = mongoose.model("product", productModel)
