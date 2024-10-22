const User = require("../../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "digiPay-jwt-secret";



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ status: 400, message: "Email and password are required" });
    }

    // Fetch user by email
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    console.log(user);

    // Check if the user has a valid password stored
    if (!user.password || typeof user.password !== 'string') {
      return res.status(500).json({ status: 500, message: "User password is invalid" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ status: 401, message: "Invalid Password" });
    }

    // Log user's login details if the login is successful
    await User.findByIdAndUpdate(user._id, {
      $push: {
        login_detail: {
          ip_address: req.user_ip || req.ip, // Fallback to req.ip if req.user_ip is undefined
          time: Date.now(),
        },
      },
    });

    // Generate token (commented out for now, can be re-enabled as needed)
 
    const authToken = await jwt.sign(
      {  _id: user._id },
      JWT_SECRET
    );

    return res.status(200).json({
      status: true,
      message: "Login successfully",
      token: authToken, // Commented out until token logic is needed again
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
}

exports.user_auth = async (req, res, next) => {
  try {
    const token = req.headers.user_token;
    console.log("t ===>", req.headers.user_token);

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "require a user token",
      });
    }
    const valid_token = jwt.verify(token, JWT_SECRET);
    if (!valid_token) throw new Error("Please authenticate a valid token");
    let user = await User.findOne({ _id: valid_token._id });
    if (!user) {
      throw new Error("user not found");
    }
    console.log("user name ===>", user.first_name);
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.registerUser = async(req, res, next) => {
  try {
    let { name, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        status: 409,
        message: "Email already exists",
      });
    }

    // Hash password before storing it
    password = await bcrypt.hash(password, 12);

    // Handle profile_image from the uploaded files
    let profile_image = "default_profile.png"; // Default profile image
    if (req?.files) {
      req.files.map((file) => {
        if (file.fieldname === "profile_image") {
          profile_image = file.filename;
        }
      });
    }

    // Create the user in the database
    let userData = await User.create({
      name,
      email,
      password,
      profile_image,
    });

    // Construct the full user name response
    let user_full_name = `${userData.name} User Created`;

    // Respond with success and the created user's data
    return res.status(201).json({
      status: true,
      message: "User created successfully",
      userData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
}

