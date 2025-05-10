// const userModel=require("../../models/user.model");

// const getUsers=async(req,resizeBy,next) =>{
//     try{
//         const users=await userModel.find();
//         res.status(200).json({
//             data:users
//         });
//     }catch(error){
//         next(error);
//     }
// };
// module.exports=getUsers;
const userModel = require("../../models/user.model");

const getUsers = async (req, res, next) => {
    try {
        const users = await userModel.find(); // Await the promise
        res.json(users);
        

    } catch (err) {
        res.status(500).json({message: error.message});
    }
};

module.exports = getUsers;