import { Router } from "express";
import { REGISTER, TEST } from "../util/AuthConstants.js";
import { createUser } from "../controller/AuthController.js";

const router = Router();

// just an api to check if the router is working fine
router.get(TEST, (req, res) => res.json({ msg: "Users Works" }));

// Register a user
router.post(REGISTER, createUser);

export default router;
