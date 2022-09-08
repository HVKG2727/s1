const { assert } = require('joi');
const mongoose = require('mongoose');

const connectDB = (url) => {
    return mongoose.connect(url, {
        useNewUrlParser: true
       
    }, (err) => {
        if (err) assert.deepStrictEqual(err, null);
        console.log('mongodb connected succesfully');
    });
}
module.exports = connectDB