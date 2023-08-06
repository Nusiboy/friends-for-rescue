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
      type:"user",
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
// exports.login = async (req, res) => {
//   try {
//     const { userName, email, password, phone, type, info } = req.body;
//     const userExists = await User.findOne({ userName });
//     if (userExists) {
//       return res.status(401).send("User already exists");
//     }
//     const newUser = await User.create({
//       userName,
//       email,
//       password,
//       phone,
//       type,
//       info,
//       marks: [],
//     });
//     res.status(200).send("Created successfully");
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };
// exports.loginUser= async(req, res)=>{
  
//   const { userName, password } = req.body;
//   const userExists = await User.findOne({userName});
//   if(!userExists){
//     return res.status(400).json("no user")
  
//   }
//   const isMatch= await bcrypt.compare(password,userExists.password)
//   if(!isMatch){
// return  res.status(400).json("password incorect")
//   }
//   const token = jwt.sign(
//     { userName: tokenUsername, _id },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: "1d",
//     })
// }

// exports.login = async (req, res) => {
//   try {
//     const { userName, password } = req.body;
//     const userExists = await User.findOne({ userName, type: "user" });
//     console.log(userExists);
//     if (!userExists) {
//       const adminExists = await Admin.findOne({ userName, type: "admin" });
//       if (!adminExists) {
//         return res.status(401).json("No admin");
//       } else {
//         const passwordAdminIsValid = bcrypt.compare(
//           password,
//           adminExists?.password
//         );
//         if (!passwordAdminIsValid) {
//           return res.status(401).json("password incorrect");
//         } else {
//           const { userName: tokenAdmin, _id } = adminExists;
//           const token = jwt.sign(
//             { userName: tokenAdmin, _id },
//             process.env.JWT_SECRET,
//             { expiresIn: "1d" }
//           );
//           res.json({ token }).status(200);
//         }
//       }
//     }else{
//       let passwordIsValid = await bcrypt.compare(password,userExists.password); 
//       console.log(passwordIsValid);
//       if(passwordIsValid){
//         const { userName: tokenUsername, _id } = userExists;
//         const token = jwt.sign(
//           { userName: tokenUsername, _id },
//           process.env.JWT_SECRET,
//           {
//             expiresIn: "1d",
//           })
//         res.json({token}).status(200);
//       } 
//     }
//   } catch (err) {
//     res.status(500).send(err.messege);
//   }
// };



// exports.updateUser = async (req, res) => {
//   try {
//     const { origin, mobility, medical } = req.body;
//     if (!origin && !mobility && !medical) {
//       return res
//         .status(400)
//         .send(
//           "Please provide either origin or mobility or medical for update."
//         );
//     }
//     const { _id } = jwt.verify(req.body.token, process.env.JWT_SECRET);
//     const user = await User.findOne({ _id });
//     if (!user) {
//       return res.status(404).send("User not found.");
//     }
//     if (origin) {
//       user.info.origin = origin;
//     }
//     if (mobility) {
//       user.info.mobility = mobility;
//     }
//     if (medical) {
//       user.info.medical = medical;
//     }
//     await user.save();
//     res.status(202).send("User has been updated");
//   } catch (err) {
//     res.status(500).json(err.message);
//   }
// };

// exports.markLocation = async (req, res) => {
//   try {
//     const { longitude, latitude, markType, found, information } = req.body;
//     if (!longitude) {
//       return res.status(400).send("Please provide longitude.");
//     }
//     if (!latitude) return res.status(400).send("Please provide latitude.");
//     if (!markType) return res.status(400).send("Please provide markType.");
//     if (!found) return res.status(400).send("Please provide found.");
//     if (!information)
//       return res.status(400).send("Please provide information.");
//     const { token } = req.body;
//     const { _id } = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findOne({ _id });
//     if (!user) {
//       return res.status(404).send("User not found.");
//     }
//     const mark = {
//       longitude: longitude,
//       latitude: latitude,
//       markType: markType,
//       found: found,
//       information: information,
//     };
//     user.marks.push(mark);
//     await user.save();
//     res.status(202).send("Mark has been added!");
//   } catch (err) {
//     res.status(500).json(err.message);
//   }
// };
