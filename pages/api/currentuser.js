import connectDb from "../../middleware/mongoose";
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
  const token = req.body.token;
  const data = jwt.verify(token, process.env.JWT_SECRET);
  
  res.status(200).json(data);
};

export default connectDb(handler);
