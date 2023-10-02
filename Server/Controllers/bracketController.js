const axios = require('axios');
const User = require('../Models/usersModel')
const Bracket = require('../Models/bracketModel');

const getBracket = async (req, res) => {
    try {
        // Get the user ID from the request parameters or query parameters
        const { userId } = req.params;

        // Find all brackets associated with the user
        const brackets = await Bracket.find({ createdBy: userId });

        res.status(200).json({ success: true, brackets });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to retrieve brackets' });
    }
};

const getBracketById = async (req, res) => {
    try {
        const { bracketId } = req.params;
    
        // Use Mongoose to find the bracket by its _id (assuming _id is the unique identifier)
        const bracket = await Bracket.findById(bracketId);
        if (!bracket) {
          return res.status(404).json({ message: 'Bracket not found' });
        }
    
        // Return the bracket as JSON
        res.status(200).json(bracket);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    };

const postBracket = async (req, res) => {
    try {
        const { userId, bracketName, allMatches } = req.body;


        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Create a new bracket and associate it with the user
        const bracket = new Bracket({
            bracketName: bracketName,
            allMatches: allMatches,
            createdBy: user?._id, // Set createdBy to the user's ID
        });

        // Save the bracket
        await bracket.save();

        // Update the user's brackets array with the new bracket's ID
        user.brackets.push(bracket?._id);
        await user.save();

        res.status(201).json({ success: true, message: 'Bracket saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to save bracket' });
    }
};



module.exports = {
    getBracket,
    postBracket,
    getBracketById

}