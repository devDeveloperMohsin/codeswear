import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
import jwt from 'jsonwebtoken';
import CryptoJS from "crypto-js";

const handler = async (req, res) => {
  if(!req.body.name || !req.body.currentPassword || !req.body.password || !req.body.token) {
    return res.status(419).json({error: 'Please fill all the fields'});
  }

  const token = req.body.token;
  const data = jwt.verify(token, process.env.JWT_SECRET);
  let user = await User.findOne({email: data.email});

  if (
    CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET).toString(
      CryptoJS.enc.Utf8
    ) != req.body.currentPassword
  ) {
    return res.status(419).json({error: 'Invalid Current Password'});
  }

  user.name = req.body.name;
  user.password = CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString(),
  await user.save();

  return res.status(200).json(user);
};

export default connectDb(handler);
