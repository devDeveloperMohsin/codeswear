import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
import CryptoJS from "crypto-js";

import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        if (
          CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET).toString(
            CryptoJS.enc.Utf8
          ) == req.body.password
        ) {
          let token = jwt.sign(
            { success: true, email: user.email, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: "2d" }
          );
          res.status(200).json({ success: "success", token });
        }
      }
      res.status(401).json({ error: "user not found" });
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
