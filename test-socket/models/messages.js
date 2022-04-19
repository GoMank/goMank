const mongoose = require('mongoose');
const msgSchema = new mongoose.Schema({
    text: String,
    createdAt: String,
    user: { _id: String },
});

const Msg = mongoose.model('messages', msgSchema);
module.exports = Msg;
