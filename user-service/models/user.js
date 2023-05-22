const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('password musn\'t contain password')
            }
        },
    },
    phoneNumber: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: '{VALUE} is not a valid 10 digit number!'
        }

    },
    dateOfBirth: {
        type: Date,
        default: new Date(),
        required: [true, "Date is not provided."],
        trim: true,
    },
    address: {
        trim: true,
        type: String,
        default: "abc",
        required: [true, "address is not provided."]
    },

    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

//Generate auth token
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

//Hash plain password before saving
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User