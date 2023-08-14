const User = require("../Models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const secretKey = 'aasdnvanvčlndsnvoasvfnaosvnc123141adp123ed';
const getUsers = async (req, res) => {
    try {
        // Exclude the 'password' field from the query results
        const users = await User.find().select('username email _id');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving users' });
    }
};

const createUser = async (req, res) => {
    const { username, email, password, privacy } = req.body;
    try {
        // Generate a salt and hash the password

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                // Create a new User instance with the hashed password
                const newUser = new User({
                    username: username,
                    email: email,
                    password: hash, // Store the hashed password in the 'password' field
                    privacy: privacy
                });

                // Save the user to the database
                const savedUser = await newUser.save();
                res.json(savedUser);
            })
        })

    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
};

const validateLogIn = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

        res.json({ token });

    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
}

const returnUser = async (req, res) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {
        const tokenResult = token.slice(7)
        const decodedToken = jwt.verify(tokenResult, secretKey);
        const userId = decodedToken.userId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ username: user.username, email: user.email, message: " Welcome to your profile" });
        
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" })
    }
}
module.exports = {
    createUser,
    getUsers,
    validateLogIn,
    returnUser
}