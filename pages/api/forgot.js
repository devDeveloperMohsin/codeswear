import ForgotModel from '../../models/Forgot';
import User from '../../models/User';
import connectDb from "../../middleware/mongoose";
import CryptoJS  from "crypto-js";

const handler =  async (req, res) => {
  if(!req.body.email) {
    return res.status(419).json({error: "Please enter your email address"});
  }
  // Check if email exists in the Database
  let user = await User.findOne({email: req.body.email});
  if(!user) {
    return res.status(419).json({error: "Invalid Email Addresss"});
  }

  // Send email to user
  let token = Math.random().toString(36).slice(2, 7);

  // if the Reset Link is already there than update the token otherwise add an entry
  let forgot = await ForgotModel.findOne({email: req.body.email});
  if(forgot) {
    forgot.token = token;
  }
  else{
    forgot = new ForgotModel({
      email: req.body.email,
      token: token,
    });
  }

  await forgot.save();
  
  let email = `<p>Click the following link to reset your password</p>
    <a href="${token}">${token}</a>
  `;

  res.status(200).json({ success: 'Email has been sent' });
}

export default connectDb(handler);
