import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/User.js';
import { validateRegisterInput } from '../validation/register.js';
import { registerUser } from '../service/UserService.js'

const router = Router();

router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

router.post('/register', async(req, res)=>{
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const isAlreadyExist = await User.findOne({  
        $or: [
            { email: req.body.email },
            { username: req.body.username }
        ] 
    });
    if (isAlreadyExist) {
        if (isAlreadyExist.email === req.body.email) {
            errors.email = 'Email already exists';
        }
        if (isAlreadyExist.username === req.body.username) {
            errors.username = 'Username already taken';
        }
        return res.status(400).json(errors);
    }
    else{
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const interest = req.body.interest | [];
        const avatar = req.body.avatar | '';

        const result = await registerUser({
            username,
            email,
            password,
            firstName,
            lastName,
            interest,
            avatar
        })
        res.status(201).json(result);
    }

   
})

export default router;
