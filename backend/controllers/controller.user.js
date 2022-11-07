const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const NormalUser = require('../models/model.user');

//Register new user to the system by encrypting password
const register_user = async (req, res) => {
    try {
      let { email, password, re_password, name, user_type} = req.body;
  
      //Validate empty input fields
      if (!email || !password || !re_password){
        return res.status(400).json({ msg: "Empty fields are not allowed" });
  
      }else{
  
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
        const savedUser = await newUser.save();
        res.json(savedUser);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
  //login user
 const login_user = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      //Validate empty fields 
      if (!email || !password)
        return res.status(400).json({ msg: "Empty fields are not allowed" });
  
      const user = await User.findOne({ email: email });
      
      //Check the existance of the account in the database
      if (!user)
        return res
          .status(400)
          .json({ msg: "Account does not exists." });
  
      //Validate password: compare password in the database with user typed password
      const isMatch = await bcrypt.compare(password, user.password); 
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });
      
      //Create user session
      const token = jwt.sign({ 
        id: user._id }, 
        process.env.JWT_SECRET,{
        expiresIn: 1440
      });
      console.log("token",token);
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
  }
  
//   //Delete user from the database
//   router.delete("/delete", auth, async (req, res) => {
//     try {
//       const deletedUser = await User.findByIdAndDelete(req.user);
//       res.json(deletedUser);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });
  
//   //Navigate to authorized user profile
//   router.get("/page", auth, async (req, res) => {
//     //Authorize the header
//     var decoded = jwt.verify(req.headers['authorization'], process.env.JWT_SECRET)
//     User.findOne({
//       _id: decoded._id
//     }).then(user => {
//       if(user){
//         res.json(user)
//       }else{
//         res.send("User does not exists.")
//       }
//     }) .catch(err => {
//       res.send("Error" + err);
//     })
//   });
  
  
  
//   router.post("/valid_token", async (req, res) => {
//     try {
//       const token = req.header("x-auth-token");
//       if (!token) return res.json(false);
  
//       const verified = jwt.verify(token, process.env.JWT_SECRET);
//       if (!verified) return res.json(false);
  
//       const user = await User.findById(verified.id);
//       if (!user) return res.json(false);
  
//       return res.json(true);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });
  
//   router.get("/", auth, async (req, res) => {
//     const user = await User.findById(req.user);
//     res.json({
//       name: user.name,
//       id: user._id,
//     });
//   });
  
  module.exports = {
    register_user,
    login_user
    
  };
