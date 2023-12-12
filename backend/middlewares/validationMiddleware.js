export const validateRegisterUser = (req, res, next) => {
  const { username, firstName, lastName, birthDate, email, password, role } =
    req.body;

  // check all required fields
  if (
    !username ||
    !firstName ||
    !lastName ||
    !birthDate ||
    !email ||
    !password ||
    !role
  ) {
    return res
      .status(400)
      .json({ message: "Validation failed. Missing required fields." });
  }

  // Check if email is a valid email address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email address." });
  }

  // Check if password has at least 6 characters
  if (!password || password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters." });
  }
  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  // check all required fields
  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  } else if (!password) {
    return res.status(400).json({ message: "Password is  required." });
  }

  // Check if email is a valid email address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email address." });
  }
  next();
};

export const validateUpdateUser = (req, res, next) => {

  const updatingOwnProfile =
    req.user && req.user._id.toString() === req.params.id; 
  const requesterIsAdmin =
    (req.user && req.user.isAdmin) || req.user.role === "admin";
  // Only allow admins to change role
  if (!requesterIsAdmin && ('role' in req.body || 'isAdmin' in req.body)) {
    return res
      .status(403)
      .json({ message: "Permission denied to update roles." });
  }
  // Only allow admins to change role and users to update their own profile
  if (!requesterIsAdmin && !updatingOwnProfile) {
    return res
      .status(403)
      .json({ message: "Permission denied to update Profile." });
  }
  next();
};

export const validateTask = (req, res, next) => {
  const { name,description,deadline } = req.body;

  // check all required fields
  if (!name) {
    return res.status(400).json({ message: "Task Name is required." });
  } else if (!description) {
    return res.status(400).json({ message: "Task description is  required." });
  }else if (!deadline) {
    return res.status(400).json({ message: "Task deadline is  required." });
  }

  next();
};

export const validateProject = (req, res, next) => {
  const { name,description,startDate } = req.body;

  // check all required fields
  if (!name) {
    return res.status(400).json({ message: "Project Name is required." });
  } else if (!description) {
    return res.status(400).json({ message: "Project description is  required." });
  }else if (!startDate) {
    return res.status(400).json({ message: "Project startDate is  required." });
  }

  // Check if the requester is a Product Owner
  const isProductOwner = req.user && (req.user.role === 'Product Owner' );
  if (!isProductOwner) {
    return res.status(403).json({ message: 'Permission denied. Only Product Owners can create projects.' });
  }
  next();
};

export const validateSprint = (req, res, next) => {
  const { name,startDate ,duration} = req.body;

  // check all required fields
  if (!name) {
    return res.status(400).json({ message: "Sprint Name is required." });
  } else if (!startDate) {
    return res.status(400).json({ message: "Sprint startDate is  required." });
  }else if (!duration) {
    return res.status(400).json({ message: "Sprint duration is  required." });
  }

  next();
};