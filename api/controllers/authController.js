import bcrypt from "bcrypt";

import User from "../models/User.js";

export const signup = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  try {
    const newUser = new User({
      ...req.body,
      password: hash
    });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    next(err);
  };
};

export const signin = async (req, res, next) => {
  const { userEmailPhone } = req.body;
  try {
    const user = await User.findOne({
      $or: [{
        "email": userEmailPhone
      }, {
        "phone": userEmailPhone
      }, {
        "username": userEmailPhone
      }]
    });
    if (!user) return res.status(404).json("Wrong credentials!");

    const checkPassword = await bcrypt.compare(req.body.password, user.password);
    if (!checkPassword) return res.status(404).json("Wrong credentials!");

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    next(err);
  };
};