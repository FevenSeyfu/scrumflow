import Jwt from "jsonwebtoken";
import { User } from "../models/userModels.js";

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // get token
      token = req.headers.authorization.split(" ")[1];
      const decoded = Jwt.verify(token, process.env.JWT_SECRET);

      // get user from token
      req.user = await User.findById(decoded.id).select("-password");

      // Check if the user is an admin or updating their own profile
      const isAdminOrUpdatingOwnProfile = req.user && (req.user.isAdmin || req.user.role === "admin" || req.user._id.toString() === decoded.id);

      if (isAdminOrUpdatingOwnProfile) {
        // If the user is not an admin, prevent updating the role and isAdmin fields
        if (!req.user.isAdmin) {
          delete req.body.role;
          delete req.body.isAdmin;
        }

        next();
      } else {
        res.status(403).json({ message: 'Permission denied. Only admins can perform this action.' });
      }
    } catch (error) {
      console.log(error.message);
      res.status(401).json({ message: 'User Not Authorized' });
    }
  }
  if (!token) {
    res.status(401).json({ message: 'Can not authorize without token' });
  }
};
