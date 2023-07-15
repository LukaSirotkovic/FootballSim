const User = require("../Models/usersModel")


const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('username email');
        res.json(users);
      } catch (error) {
        res.status(500).json({ error: 'Error retrieving users' });
      }
};

const createUser = async (req, res) => {
    const { username, email, password, confirmPassword, privacy } = req.body;


    const newUser = new User({
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        privacy: privacy
    });

    newUser.save()
        .then((savedUser) => {
            res.json(savedUser);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error saving user' });
        });



};

module.exports = {
    createUser,
    getUsers
}