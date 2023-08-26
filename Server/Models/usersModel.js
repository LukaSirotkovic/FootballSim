const mongoose = require('mongoose');
const { Schema, ObjectId } = mongoose;

const usersSchema = Schema(
    {
        
        username: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (value) {
                    return /^[a-zA-Z0-9]+$/.test(value);
                },
                message: 'Username can only contain letters and numbers'
            }
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please enter a valid email address']
        },
        password: {
            type: String,
            required: true,
            minlength: [6, 'Password must be at least 6 characters long']
        },
        confirmPassword: {
            type: String,
            validate: {
                validator: function (value) {
                    return value === this.password;
                },
                message: 'Confirm password must match the password',
            },
        },
        privacy: {
            type: Boolean,
            required: [true, 'Privacy field must be checked'],

        },
        avatar: {
            type: String,
        },
        brackets: [{
            type: Schema.Types.ObjectId,
            ref: 'Bracket'
        }]
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", usersSchema, "Users");

module.exports = User;