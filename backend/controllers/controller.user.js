const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/model.user");

//Register new user to the system by encrypting password
const register_user = async (req, res) => {
  try {
    let { email, password, re_password, name, user_type } = req.body;

    //Validate empty input fields
    if (!email || !password || !re_password) {
      return res.status(400).json({ msg: "Empty fields are not allowed" });
    } else {
      //Validate password length with minimum 8 character
      if (password.length < 7)
        return res
          .status(400)
          .json({ msg: "Check password length. Not less than 8 characters." });

      //Check the password entered matches with the entered password
      if (password !== re_password)
        return res
          .status(400)
          .json({ msg: "Enter the same password twice for verification." });

      //Validate the exixtance of the account
      const existingUser = await User.findOne({ email: email });
      if (existingUser)
        return res
          .status(400)
          .json({ msg: "An account with this email already exists." });

      //If the user does not exist create a new users
      if (!name) name = email;

      //Hash password
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = new User({
        email,
        password: passwordHash,
        name,
        user_type,
      });
      await newUser.save();
      res.json({ msg: "User was registered successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//login user
const login_user = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Validate empty fields
    if (!email || !password)
      return res.status(400).json({ msg: "Empty fields are not allowed" });

    const user = await User.findOne({ email: email });

    //Check the existance of the account in the database
    if (!user) return res.status(400).json({ msg: "Account does not exists." });

    //Validate password: compare password in the database with user typed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    //Create user session
    // TODO - Include user type
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        type: user.user_type,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 1440,
      }
    );
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  register_user,
  login_user,
};
