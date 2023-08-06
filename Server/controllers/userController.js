const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
  console.log(req.body);
  let {userName,type,email ,phone ,password, info}=req.body
  if (!type) {
    type="user"
  }
  console.log(userName,type,email ,phone ,password, info);
  try{
    const isregister = await User.findOne({userName:req.body.userName})
    if(isregister){
      return res.status(400).json("user is already registered")
    }
    console.log(password,"this is the password");
    const hashPassword=await bcrypt.hash(password,10)
    console.log(hashPassword,"this is the hashed password");
    const newUser=await User.create({
      userName,
      type,
      email,
      phone,
      password:hashPassword,
      info,
    })
    return res.status(200).json(newUser)
  } catch(err){
    res.status(500).json(err.message)
  }
};


exports.login = async (req, res) => {
  console.log(req.body);
  try {
    const {userName,password}=req.body
    const existUser=await User.findOne({userName})
    let type=existUser.type
    let num=existUser.phone
    if (!existUser) {
      return res.status(401).json("couldnt find this user")
    }
  bcrypt.compare(password,existUser.password,(err,isMatch)=>{
    if (err||!isMatch) {
      return res.status(402).json("invalid username or password")
    }else{
      const token=jwt.sign({id:existUser._id},process.env.JWT_SECRET)
      console.log("sucess");
      res.json({token,type,num,userName})
    }
  })
  } catch (err) {
    res.status(500).send(err.message);
  }
};


exports.update= async(req, res)=>{
  console.log(req.body);
  const { origin, mobility,medical } = req.body;
  const newinfo = { 
    "info": { 
      "origin": origin, 
      "mobility": mobility, 
      "medical": medical 
    }
  };
  try{
    const realId=jwt.verify(req.body.token,process.env.JWT_SECRET)
    console.log(realId);
    const userData=await User.findOne({_id:realId.id})
    console.log(userData);
    if (userData.type=="user") {
      console.log("here");
      let doc = await User.findOneAndUpdate({_id: realId.id},newinfo,{new: true});
    return res.status(200).json(doc)
    }else{
      console.log("you are admin");
    }
  }catch(err){
    return res.status(500).json(err.message)
  }
}

