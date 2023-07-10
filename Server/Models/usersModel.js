const mongoose = require('mongoose');
const { Schema, ObjectId } = mongoose;

const usersSchema = Schema(
    {
        username: {
            type: String,
            required: true,
            validate: {
                validator: function (value) {
                    // Custom validation logic
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
            minlength: [6, 'Password must be at least 6 characters long'],
            maxlength: [20, 'Password cannot exceed 20 characters']
        },
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", usersSchema, "Users");

module.exports = User;