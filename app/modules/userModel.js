const mongoose = require('mongoose');
const Records = mongoose.model('Record', new mongoose.Schema({
    name: { type: String, required: true, trim: true }, age: { type: Number, required: true, min: 0 },
})
);

module.exports = Records;