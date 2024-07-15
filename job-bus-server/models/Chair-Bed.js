const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const {Schema} = mongoose;

const ChairBedSchema = new Schema({
    seat_map: [{
        maGhe: String,
        level: String,
        trangThai: String,
    }],
    maChuyenXe: ObjectId,

})

const ChairBedModel = mongoose.model('Chair-Bed', ChairBedSchema);

module.exports = ChairBedModel;