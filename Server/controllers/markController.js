const Mark = require("../models/markModel");


exports.addmark = async (req, res) => {
    console.log(req.body);
    let {username,latitude,longitude ,found ,information, markType,date}=req.body
    console.log(username,latitude,longitude ,found ,information, markType,date);
    try{
       console.log("hey");
        const newMark=await Mark.create({
            username,
            latitude,
            longitude,
            found,
            information,
            markType,
            date
        })
        console.log("hi");
        return res.status(200).json(newMark)
      } catch(err){
        res.status(500).json(err.message)
      }
    
  };
// exports.addmark = async (req, res) => {
//     console.log(req.body);
//     let {username,latitude,longitude ,found ,information, markType,date}=req.body
//     console.log(username,latitude,longitude ,found ,information, markType,date);
//     try{
//        console.log("hey");
//         const newMark=await Mark.create({
//             username,
//             latitude,
//             longitude,
//             found,
//             information,
//             markType,
//             date
//         })
//         console.log("hi");
//         return res.status(200).json(newMark)
//       } catch(err){
//         res.status(500).json(err.message)
//       }
    
//   };

  exports.takemark = async (req, res) => {
    try{
      let data = await Mark.find()
       return res.status(200).json(data)
     } catch(err){
       res.status(500).json(err.message)
     }
  };

exports.delete = async (req, res) => {
  let {_id}=req.body
  try {
    console.log(_id);
    console.log("sdfd");
    await Mark.deleteOne({ _id: _id });
    res.status(200).json("success");
  } catch (err) {
    res.status(400).json(err.message);
  }
};