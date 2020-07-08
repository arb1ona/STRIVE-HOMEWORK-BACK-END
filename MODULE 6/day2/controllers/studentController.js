const express = require('express')
var router = express.Router()
const mongoose = require('mongoose')
const Student = mongoose.model('Student')


router.get('/', (req, res) => {
    res.render("student/addOrEdit", {
        viewTitle: "Strive Students"
    })
})
router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res)
    // console.log(req.body)
})

function insertRecord(req, res) {
    var student = new Student()
    student.name = req.body.name
    student.email = req.body.email
    student.profession = req.body.profession
    student.state = req.body.state
    student.save((err, doc) => {
        if (!err)
            res.redirect('student/list')
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("student/addOrEdit", {
                    viewTitle: "Strive Students",
                    student: req.body
                })
            }
            else
                console.log('Error during record insertion :' + err)
        }
    })
}

function updateRecord(req, res) {
    Student.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('student/list') }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body)
                res.render("student/addOrEdit", {
                    viewTitle: 'Update Student',
                    student: req.body
                })
            }
            else
                console.log('Error during record update:' + err)
        }
    })
}

router.get('/list', (req, res) => {
    // res.json('from list')
    Student.find((err, docs) => {
        if (!err) {
            res.render("student/list", {
                list: docs
            })
        }
        else {
            console.log('Error in retrieving student list:' + err)
        }
    })
})

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['nameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Student.findById((req.params.id, (err, docs) => {
        if (!err) {
            res.render("student/addOrEdit", {
                viewTitle: "Update Student",
                student: doc
            })

        }
    })

    )
})

router.get('/delete/:id', (req, res) => {
    Student.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/student/list')
        }
        else { console.log('Error in student delete:' + err) }
    })
})

























module.exports = router;
