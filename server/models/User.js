const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true

        },
        password: {
            type: String,
            required: true
        },
        uploads: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Image"
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
)

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10
        this.password = await bcrypt.hash(this.password, saltRounds)
    }
})

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)
module.exports = User
