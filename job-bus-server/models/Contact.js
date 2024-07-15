const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const {Schema} = mongoose;

const ContactSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    maUser: ObjectId,
    title: String,
    content: String,
});

const ContactModel = mongoose.model('Contact', ContactSchema);

module.exports = ContactModel;