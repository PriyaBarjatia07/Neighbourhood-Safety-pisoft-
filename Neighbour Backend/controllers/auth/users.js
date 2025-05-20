
const userModel = require("../../models/user.model");

const getUsers = async (req, res, next) => {
    try {
        const users = await userModel.find(); 
        res.json(users);
        

    } catch (err) {
        res.status(500).json({message: error.message});
    }
};

module.exports = getUsers;