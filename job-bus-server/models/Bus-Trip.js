const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const {Schema} = mongoose;

const TripSchema = new Schema({
    diemDi: String,
    diemDen: String,
    loaiXe: String,
    gioDi: String,
    gioDen: String,
    ngayDi: Date,
    thoiGianHanhTrinh: String,
    giaVe: Number,
    maTuyenXe: ObjectId,

})

const TripModel = mongoose.model('Trip-Bus', TripSchema);

module.exports = TripModel;