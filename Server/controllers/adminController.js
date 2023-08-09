
const jwt = require("jsonwebtoken");
// exports.admins = (req, res) => {
//   Admin.find({}).then((data) => {
//     res.send(data);
//   });
// };
// exports.register = async (req, res) => {
//   try {
//     const { userName, email, password, phone } = req.body;
//     const adminExists = await Admin.findOne({ userName, email, phone });
//     if (adminExists) {
//       return res.status(401).send("Admin already exists");
//     }
//     const newAdmin = await Admin.create({ userName, email, password, phone });
//     res.status(200).send("Created successfully");
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { userName, password } = req.body;
//     const adminExists = await Admin.findOne({ userName });
//     if (!adminExists) {
//       return res.status(401).json("No user");
//     }
//     const passwordIsValid = bcrypt.compare(password, adminExists.password);
//     if (!passwordIsValid) return res.status(401).json("password incorrect");
//     const { userName: tokenUsername, _id } = adminExists;
//     const token = jwt.sign(
//       { userName: tokenUsername, _id },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "1d",
//       }
//     );
//     res.json({ token }).status(200);
//   } catch (err) {
//     res.status(500).send(err.messege);
//   }
// };

exports.markPolygon = async (req, res) => {
  try {
    const { position,type,center,coordinates,northEast,southWest} = req.body;
    switch(type) {
      case "rectangle":
        
        break;
      case "polyline":
        // code block
        break;
      case "polygon":
        // code block
        break;
      case "circle":
        
        break;
      case "Marker":
        const newShape=await Shape.create({
          latitude:position.lat ,
          longitude:position.lng,
      })
      console.log(newShape);
        break;
      default:
        console.log("no sach a shape");
    }
    if (!coordinates) {
      return res.status(400).send("Please provide coordinates.");
    }
    // if (!area) return res.status(400).send("Please provide area.");
    if (!type) return res.status(400).send("Please provide type.");
    const { token } = req.body;
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findOne({ _id });
    if (!admin) {
      return res.status(404).send("Admin not found.")
    }
    const polygon = {
      type: type, 
      coordinates,
      // area
    };
    if (!admin.shapes[0]) {
      admin.shapes[0] = {};
    }
    if (!admin.shapes[0].polygons) {
      admin.shapes[0].polygons = [];
    }
    admin.shapes[0].polygons.push(polygon);
      await admin.save();
      res.status(202).send("Polygon has been added!");
    } catch (err) {
      res.status(500).json(err.message);
    }
  };
exports.markPolyline = async (req, res) => {
  try {
    const { coordinates, lines, type } = req.body;
    if (!coordinates) {
      return res.status(400).send("Please provide coordinates.");
    }
    if (!lines) return res.status(400).send("Please provide lines.");
    if (!type) return res.status(400).send("Please provide type.");
    const { token } = req.body;
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findOne({ _id });
    if (!admin) {
      return res.status(404).send("Admin not found.")
    }
    const polyline = {
      type: type, 
      coordinates,
      lines
    };
    if (!admin.shapes[0]) {
      admin.shapes[0] = {};
    }
    if (!admin.shapes[0].polylines) {
      admin.shapes[0].polylines = [];
    }
    admin.shapes[0].polylines.push(polyline);
      await admin.save();
      res.status(202).send("Polyline has been added!");
    } catch (err) {
      res.status(500).json(err.message);
    }
  };
exports.markCircle = async (req, res) => {
  try {
    const { center, radius, area, type } = req.body;
    if (!center) {
      return res.status(400).send("Please provide center.");
    }
    if (!radius) return res.status(400).send("Please provide radius.");
    // if (!area) return res.status(400).send("Please provide area.");
    if (!type) return res.status(400).send("Please provide type.");
    const { token } = req.body;
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findOne({ _id });
    if (!admin) {
      return res.status(404).send("Admin not found.")
    }
    const circle = {
      type: type, 
      center,
      radius
    };
    if (!admin.shapes[0]) {
      admin.shapes[0] = {};
    }
    if (!admin.shapes[0].circles) {
      admin.shapes[0].circles = [];
    }
    admin.shapes[0].circles.push(circle);
      await admin.save();
      res.status(202).send("Circle has been added!");
    } catch (err) {
      res.status(500).json(err.message);
    }
  };
exports.markRectangle = async (req, res) => {
  try {
    const { northEast, southWest, area, type } = req.body;
    if (!northEast) {
      return res.status(400).send("Please provide longitude.");
    }
    if (!southWest) return res.status(400).send("Please provide latitude.");
    // if (!area) return res.status(400).send("Please provide area.");
    if (!type) return res.status(400).send("Please provide type.");
    const { token } = req.body;
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findOne({ _id });
    if (!admin) {
      return res.status(404).send("Admin not found.")
    }
    const rectangle = {
      type: type, 
      northEast,
      southWest
    };
    if (!admin.shapes[0]) {
      admin.shapes[0] = {};
    }
    if (!admin.shapes[0].rectangles) {
      admin.shapes[0].rectangles = [];
    }
    admin.shapes[0].rectangles.push(rectangle);
      await admin.save();
      res.status(202).send("Rectangle has been added!");
    } catch (err) {
      res.status(500).json(err.message);
    }
  };

exports.markShape = async (req, res) => {
  try {
    const { type } = req.body;
    if (!type) {
      return res.status(400).send("Please provide shape type.");
    }
    const { token } = req.body;
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findOne({ _id });
    if (!admin) {
      return res.status(404).send("Admin not found.");
    }
    const shapeProperties = {
      polygon: ['coordinates'],
      polyline: ['coordinates', 'lines'],
      circle: ['center', 'radius'],
      rectangle: ['northEast', 'southWest']
    };
    if (!admin.shapes[0]) {
      admin.shapes[0] = {};
    }

    const shapeTypeProperties = shapeProperties[type];
    if (!shapeTypeProperties) {
      return res.status(400).send(`Invalid shape type: ${type}.`);
    }

    const shape = {};
    shapeTypeProperties.forEach(property => {
      if (!req.body[property]) {
        return res.status(400).send(`Please provide ${property}.`);
      }
      shape[property] = req.body[property];
    });

    if (!admin.shapes[0][type + 's']) {
      admin.shapes[0][type + 's'] = [];

    }

    admin.shapes[0][type + 's'].push(shape);
    await admin.save();

    res.status(202).send(`${type} has been added!`);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
