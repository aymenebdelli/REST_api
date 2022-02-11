const mongoose = require('mongoose')
const { Schema } = mongoose


const contactSchema = new Schema({
    fullName: { type: String, required: true, unique: true },
    mail: { type: String, unique: true },
    age: Number
})

const Contact = mongoose.model("user", contactSchema)
module.exports = Contact