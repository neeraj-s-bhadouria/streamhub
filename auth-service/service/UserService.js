import bcrypt from 'bcryptjs';
import dotenv from "dotenv";
import util from 'util';
import User from '../model/User.js';
dotenv.config();

export const registerUser = async(data)=>{
    try{
        const newUser = new User({
           ...data
        })
        const genSaltAsync = util.promisify(bcrypt.genSalt);
        const hashAsync = util.promisify(bcrypt.hash);

        const salt = await genSaltAsync(10);
        const hash = await hashAsync(data.password, salt);
        newUser.password = hash;
        const savedUser = await newUser.save();
        return savedUser;
    }catch(err){
        console.log(err);
    }
    

}