const mongoose = require('mongoose')

var studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required.'
    },
    email: {
        type: String
    },
    profession: {
        type: String,
        required: 'This field is required.'
    },
    state: {
        type: String
    }
})

// Custom validation for email

studentSchema.path('email').validate((val) => {
    emailRegex = /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([\.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i
    return emailRegex.test(val)
}, "Invalid e-mail");


mongoose.model('Student', studentSchema)