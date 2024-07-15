const mongoose = require('mongoose');
const {Schema, Types} = mongoose;

const TicketSchema = new Schema({
    maVeXe: String,
    tenKhachHang: String,
    phone: String,
    email: String,
    tenTuyenXe: String,
    tenChuyenXe: String,
    diemDon: String,
    diemTra: String,
    maChuyenXe: Types.ObjectId,
    gioKhoiHanh: String,
    maGhe: String,
    soLuongGhe: String,
    maKhachHang: Types.ObjectId,
    trangThai: String,
    giaVe: Number,
    qrCode: String,
});

const TicketModel = mongoose.model('Ticket', TicketSchema);

module.exports = TicketModel;