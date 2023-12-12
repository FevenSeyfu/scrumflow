import Jwt from "jsonwebtoken";
import { User } from "../models/userModels.js";

export const protect = async(req,res,next) =>{
  let token
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      try{
          // get token
          token = req.headers.authorization.split(' ')[1];
          const decoded = Jwt.verify(token,process.env.JWT_SECRET)

          // get user from token
          req.user = await User.findById(decoded.id).select('-password')
          next()
      }catch(error){
          console.log(error.message);
          res.status(401).json({message : 'User Not Authorized'});
      }
  }
  if(!token){
      res.status(401).json({message : 'Can not authorize without token'});
  }
}
