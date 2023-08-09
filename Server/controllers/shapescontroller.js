const Shape = require("../models/shapeModel");


  
exports.addshape = async (req, res) => {
  try {
    const {
      radius,
      position,
      type,
      center,
      coordinates,
      northEast,
      southWest,
    } = req.body;
    switch (type) {
      case "rectangle":
        const newRectangle = await Shape.create({
          type: type,
          northEast: { latitude: northEast.lat, longitude:northEast.lng },
          southWest:{latitude: southWest.lat, longitude: southWest.lng }
        });
        console.log(newRectangle);
        res.status(202).send("Polygon has been added!");
        break;
      case "polyline":
       const newPolyline= await Shape.create({
        type:type,
        coordinates:coordinates
       })
       console.log(newPolyline);
       res.status(202).send("Polygon has been added!");
        break;
      case "polygon":
       const newPolygon= await Shape.create({
        type:type,
        coordinates:coordinates
       })
       console.log(newPolygon);
       res.status(202).send("Polygon has been added!");
        break;
      case "circle":
        const newCircle= await Shape.create({
            type:type,
            center:center,
            radius:radius
           })
           console.log(newCircle);
       res.status(202).send("Polygon has been added!");
        break;
      case "Marker":
        const newMarker = await Shape.create({
          type: type,
          latitude: position.lat,
          longitude: position.lng,
        });
        console.log(newMarker);
        res.status(202).send("Polygon has been added!");
        break;
      default:
        console.log("no sach a shape");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.takeshape = async (req, res) => {
    try {
        let data = await Shape.find()
        console.log(data);
        return res.status(200).json(data)
      }
     catch (err) {
      res.status(500).json(err.message);
    }
  };

  exports.delete = async (req, res) => {
    let {_id}=req.body
    console.log(_id);
  try {
    await Shape.deleteOne({ _id: _id });
    res.status(200).json("success");
  } catch (err) {
    res.status(400).json(err.message);
  }
  };
