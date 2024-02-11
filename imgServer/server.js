const path = require('path')
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'cache/')
    },
    filename: function (req, file, cb) {
        console.log(req.body)
        let ext = '.png'
        cb(null, `${req.body.filename}${ext}`)
    }
})
const upload = multer ({ storage: storage})
const app = express()
const PORT = process.env.PORT || 3002;

app.post('/', upload.single('upload'), async (req, res) => {
    console.log(req.body)
    res.redirect('http://localhost:3000/')
    
})

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'cache')));

app.listen(PORT, () => console.log(`Image server listening on ${PORT}`))

