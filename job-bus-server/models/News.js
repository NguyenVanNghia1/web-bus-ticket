const mongoose = require('mongoose');
const {Schema} = mongoose;

const NewsSchema = new Schema({
    tieuDe: String,
    noiDung: String,
    image: String,
    thoiGianDangBai: Date,
    noiBat: Boolean,
    levelNoiBat: Number,
    chuDe: String,
});

const NewsModel = mongoose.model('News', NewsSchema);

module.exports = NewsModel;