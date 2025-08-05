import { validationResult } from "express-validator";
import userModel from "../models/user.model.js";

const registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {fullname, email, password} = req.body;

    const hashedPassword = await userModel.hashPassword(password);

    const user = new userModel({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname,
        },
        email,
        password: hashedPassword,
    });

    await user.save();

    const token = user.generateAuthToken();

    res.send({ token , user});
}

const loginUser = async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    const user = await userModel.findOne({ email }).select("+password")

    if (!user) {
        return res.status(401).json({message: "Invalid email or password"})
    }

    if (!await user.comparePassword(password)) {
        return res.status(401).json({message: "Invalid email or password"})
    }

    const token = user.generateAuthToken();

    res.send({ token , user});
}

export { registerUser, loginUser };