import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../model/User.js";
import { validateRegisterInput } from "../validation/register.js";
import { isEmpty } from "validator";
dotenv.config();

export const registerUser = async (data) => {
  try {
    const newUser = new User({
      ...data,
    });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);

    newUser.password = passwordHash;
    const savedUser = await newUser.save();
    return savedUser;
  } catch (err) {
    console.log(err);
  }
};

// performing all the validations related to registration of the user
export const registerValidations = async (data) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return errors;
  }
  const isAlreadyExist = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  });
  if (isAlreadyExist) {
    if (isAlreadyExist.email === req.body.email) {
      errors.email = "Email already exists";
    }
    if (isAlreadyExist.username === req.body.username) {
      errors.username = "Username already taken";
    }
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

// method to generate jwt token after successfull login
export const generateToken = async (data) => {
  return jwt.sign(
    { id: data._id, firstName: data.firstName, email: data.email },
    process.env.JWT_SECRET_KEY
  );
};
