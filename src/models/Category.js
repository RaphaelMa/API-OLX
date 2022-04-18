const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const CategorySchema = new mongoose.Schema({
    name: String,
    slug: String
});

const modelName = 'Category';

if(mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, CategorySchema);
}