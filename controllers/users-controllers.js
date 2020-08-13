
const HttpError = require('../models/http-errors');

const { validationResult } = require('express-validator')
const User = require('../models/users');

const getUsers = async (req, res, next) =>{
    let users;
    try{
        users =await User.find({}, '-password');
       
    }catch(err){
        const error = new HttpError('Fetching users failed, please try again later.',
        500);
        return next(error);
    }

res.json({users: users.map(user => user.toObject({getters:true}))});
};

const signup = async (req,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next( new HttpError('Invalid inputs passed, please check your data.', 422)
        )}
const{username,email,description} = req.body;
console.log(username,email,description);
const createdUser = new User({
username,
email,
description
});
try {
    await createdUser.save();
} catch (err) {
    const error = new HttpError( 'Signing up failed, please try again later.',
    500);
    return next(error);
}
res.status(201).json({userId: createdUser.username,email: createdUser.email,description: createdUser.description, sucess:'sucess' });

};

exports.getUsers = getUsers;
exports.signup=signup;








// let existingUser;
// try{
//     existingUser = await User.findOne({email: email})
// }catch(err){
// const error = new HttpError('Signing up failed, please try again later.',
// 500);
// return next(error);
// }
// if(existingUser){
//     const error = new HttpError('User exists already, please login instead.',
//     422);
//     return next(error);
// }