import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
import CryptoJS  from "crypto-js";

const handler = async (req, res) => {
  if (req.method == "POST") {
    try{
      let u = new User({
        name: req.body.name,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString(),
      });

      await u.save();
  
      res.status(200).json({ success: "success" });
    }
    catch(e) {
      res.status(500).json(e);
    }
    
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
