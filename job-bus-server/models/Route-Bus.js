const mongoose = require('mongoose');
const {Schema} = mongoose;

const RouteSchema = new Schema({
    diemDi: String,
    diemDen: String,
    loaiXe: String,
    quangDuong: Number,
    thoiGianHanhTrinh: String,
    giaVe: Number,
})

const RouteModel = mongoose.model('Route-Bus', RouteSchema);

module.exports = RouteModel;