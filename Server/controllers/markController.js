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