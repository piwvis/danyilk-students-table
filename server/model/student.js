const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    name: {type: String,}, surname: {type: String}, studentId: {type: String},
});

const Student = mongoose.model('Student', StudentSchema)

module.exports = Student