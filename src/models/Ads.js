const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const AdsSchema = new mongoose.Schema({
    idUser: String,
    state: String,
    category: String,
    images: [Object],
    dateCreated: Date,
    title: String,
    price: Number,
    priceNegotiabe: Boolean,
    descreption: String,
    views: Number,
    status: String
});

const modelName = 'Ads';

if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, AdsSchema);
}