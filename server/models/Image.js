const mongoose = require('mongoose')

const Image = mongoose.model(
    'Image',
    new mongoose.Schema({
        filename: {
            type: String,
            required: true,
            unique: true
        },
        uploader: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }, 
        tags: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag"
        },
        score: {
            type: Number,
            required: true,
            default: 0
        }
    })
)

module.exports = Image

