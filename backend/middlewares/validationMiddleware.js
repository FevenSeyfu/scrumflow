export const validateRegisterUser = (req, res, next) => {
    const { username, firstName, lastName, birthDate, email, password, role } = req.body;
  
    // check all required fields
    if (!username || !firstName || !lastName || !birthDate || !email || !password || !role)  {
      return res.status(400).json({ message: 'Validation failed. Missing required fields.' });
    }
    
    // Check if email is a valid email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email address.' });
    }

    // Check if password has at least 6 characters
    if (!password || password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }
    next();
};

export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
  
    // check all required fields
    if (!email )  {
      return res.status(400).json({ message: 'Email is required.' });
    } else if (!password )  {
        return res.status(400).json({ message: 'Password is  required.' });
      }
    
    // Check if email is a valid email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email address.' });
    }
    next();
}

export const validateUpdateUser = (req, res, next) => {
    const { role, isAdmin } = req.body;
  
    // Check if user is an admin
    const requesterIsAdmin = (req.user && req.user.isAdmin) || req.user.role === 'admin';
  
    // Check if requester is updating their own profile
    const updatingOwnProfile = req.user && req.user._id.toString() === req.params.id;
  
    // Only allow admins to change role 
    if ((req.isAdmin || req.role) && (role || isAdmin)) {
        return res.status(403).json({ message: 'Permission denied to update roles.' });
    }
    // Only allow admins to change role and users to update their own profile
    if ((req.isAdmin || req.role) && !requesterIsAdmin && !updatingOwnProfile) {
      return res.status(403).json({ message: 'Permission denied to update Profile.' });
    }

    next();
  };