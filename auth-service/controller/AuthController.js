import User from "../model/User.js";
import { registerUser, registerValidations } from "../service/UserService.js";

export const createUser = async (req, res) => {
  const { errors, isValid } = await registerValidations(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const interest = req.body.interest | [];
    const avatar = req.body.avatar | "";

    const result = await registerUser({
      username,
      email,
      password,
      firstName,
      lastName,
      interest,
      avatar,
    });
    res.status(201).json(result);
  }
};
