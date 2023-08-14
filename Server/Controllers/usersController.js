const User = require("../Models/usersModel");
const bcrypt = require("bcrypt");

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

const checkUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const user = await User.findOne({ $or: [{ username }, { email }] });
      if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      return res.json({ user });
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred' });
    }
  }

module.exports = {
    createUser,
    getUsers,
    checkUser
}