const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
var jwt = require('jsonwebtoken');
const { ResultWithContext } = require('express-validator/src/chain');
const JWT_SECRET='HarryisagoodB$oy';
const fetchUser=require('../middleware/fetchUser');

router.post('/createuser', body('email').isEmail(), body('password').isLength({ min: 6 }), body('name').isLength({ min: 3 }), async (req, res) => {
  const errors = validationResult(req);
  let success=false;
  if (!errors.isEmpty()) {
    return res.status(400).json({ success,errors: errors.array() });
  }
  try{
  let user = await User.findOne({ email: req.body.email })
  if (user) {
    return res.status(400).json({success, error: "Sorry a user with this email already exist" });
  }
  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(req.body.password, salt);
  user = await User.create({
    email: req.body.email,
    password: secPass,
    name: req.body.name,
  })
  const data = {
    user: {
      id: user.id
    }
  }
  var authToken = jwt.sign(data, JWT_SECRET);
  success=true;
  res.json({ success,authToken });
}
catch(error){
  console.error(error.message);
  res.status(500).send("Internal server error");
}

})
//Autheticate a user
router.post('/login', body('email').isEmail(), body('password').exists(), async (req, res) => {
  const errors = validationResult(req);
  let success=false;
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const {email,password}=await req.body;
  try {
    let user = await User.findOne({email })
    if (!user) {
      return res.status(400).json({ success,error: "Please try to login with correct credentials"});
    }
    const passwordCompare=await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      return res.status(400).json({success,error:"Please try to login with correct credentials"});
    }
    const data = {
      user: {
        id: user.id
      }
    }
    success=true;
    var authToken = jwt.sign(data, JWT_SECRET);
    res.json({ success,authToken });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
})
//fetch a user
router.post('/getUser', fetchUser, async (req, res) => {
    
  
  try {
  let userId=req.user.id;
   const user= await User.findById(userId).select("-password");
   res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
})

module.exports = router;