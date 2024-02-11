const mongoose = require('mongoose')

const Tag = mongoose.model(
    'Tag',
    new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true,
        },
        imagesWithThisTag: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Image"
        }
    })
)

module.exports = Tag
