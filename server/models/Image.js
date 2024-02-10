const mongoose = require('mongoose')

const Image = mongoose.model(
    'Image',
    new mongoose.Schema({
        filename: {
            type: String,
            require: true,
            unique: true
        },
        uploader: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }, 
        tags: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag"
        }
    })
)

module.exports = Image

