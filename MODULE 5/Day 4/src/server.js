const express = require("express"); // 1st step
const multer = require("multer")
const ejs = require("ejs")
const path = require("path");
const { equal } = require("assert");

// SERVER STORAGE ENGINE
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

// INIT UPLOAD
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        checkFileType(file, cb)
    }
}).single('myImage')

// CHECK FILE TYPE
function checkFileType(file, cb) {
    // ALLOWED EXT
    const filetypes = /jpeg|jpg|png|gif/
    // check ext
    const extname = filetypes.test(path.extname
        (file.originalname).toLocaleLowerCase())
    // check mime
    const mimetype = filetypes.test(file.mimetype)
    if (mimetype && extname) {
        return cb(null, true)
    } else {
        cb('Error: Images Only!')
    }

}

// INIT SERVER  2nd step
const server = express()
//  EJS
server.set('view engine', 'ejs')
//  PUBLIC FOLDER
server.use(express.static('./public'))

server.get('/', (req, res) => res.render('index'))  // CREATE ROUTE


server.post('/upload', (req, res) => {
    // res.send('hello, its working')
    upload(req, res, (err) => {
        if (err) {
            res.render('index', {
                msg: err
            })
        } else {
            // console.log(req.file);
            // res.send('hello, its working')
            if (req.file == undefined) {
                res.render('index', {
                    msg: 'Error: No file selected!'
                })
            } else {
                res.render('index', {
                    msg: 'File Uploaded!',
                    file: `uploads/${req.file.filename}`
                })
            }
        }
    })
})


const port = process.env.PORT || 3005 // variable for port number
server.listen(port, () => { //2nd step
    console.log(`Server started on port ${port}`)
})

