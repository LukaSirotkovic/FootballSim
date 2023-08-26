const User = require("../Models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY


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
                    privacy: privacy,
                    avatar: 'https://api.dicebear.com/6.x/miniavs/svg?seed=Abby&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4'
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

        res.json(user);

    } catch (error) {
        return res.status(401).json({ message: "Invalid token" })
    }
}
const deleteAccount = async (req, res) => {
    const { id } = req.params;
    try {
        await User.deleteOne({ _id: id });
        res.json({ success: true, message: 'Account deleted successfully' });
    } catch (error) {
        console.error('Error deleting account:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }


}
const updateAccount = async (req, res) => {
    const { id } = req.params;
    try {
        await User.updateOne({ _id: id }, {
            $set: {
                avatar: req.body.avatar,

            }
        });
        res.send({ status: "Ok", data: "Updated" });
    } catch (error) {
        console.error('Error updating account:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }

}

module.exports = {
    createUser,
    validateLogIn,
    returnUser,
    updateAccount,
    deleteAccount,
}