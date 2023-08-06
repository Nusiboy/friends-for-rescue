const mongoose = require("mongoose");

const polygonSchema = new mongoose.Schema({
  type: { type: String, enum: "polygon" },
  coordinates: [
    {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  ],
  area: { type: Number },
});

// polygonSchema.pre("save", function (next) {
//   const polygon = this;
//   const polygonCoordinates = polygon.coordinates.map((coord) => ({
//     lat: coord.lat,
//     lng: coord.lng,
//   }));
//   const googlePolygon = new google.maps.Polygon({ paths: polygonCoordinates });
//   const area = google.maps.geometry.spherical.computeArea(
//     googlePolygon.getPath()
//   );
//   polygon.area = area;
//   next();
// });

const lineSchema = new mongoose.Schema({
  start: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  end: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
});

const polylineSchema = new mongoose.Schema({
  type: { type: String, enum: "polyline" },
  coordinates: [
    {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  ],
  lines: [lineSchema],
});

// polylineSchema.pre("save", function (next) {
//   const polyline = this;

//   const lines = [];

//   for (let i = 0; i < polyline.coordinates.length - 1; i++) {
//     const currentCoord = polyline.coordinates[i];
//     const nextCoord = polyline.coordinates[i + 1];

//     lines.push({
//       start: {
//         lat: currentCoord.lat,
//         lng: currentCoord.lng,
//       },
//       end: {
//         lat: nextCoord.lat,
//         lng: nextCoord.lng,
//       },
//     });
//   }

//   polyline.lines = lines;

//   next();
// });

const circleSchema = new mongoose.Schema({
  type: { type: String, enum: "circle" },
  center: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  radius: { type: Number, required: true },
  area: { type: Number },
});

// circleSchema.pre("save", function (next) {
//   const circle = this;
//   const googleCircle = new google.maps.Circle({
//     center: { lat: circle.center.lat, lng: circle.center.lng },
//     radius: circle.radius,
//   });
//   const area = google.maps.geometry.spherical.computeArea(
//     googleCircle.getBounds().getNorthEast(),
//     googleCircle.getBounds().getSouthWest()
//   );
//   circle.area = area;
//   next();
// });

const rectangleSchema = new mongoose.Schema({
  type: { type: String, enum: ["rectangle"] },
  northEast: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  southWest: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  // area: { type: Number },
});


// rectangleSchema.pre("save", function (next) {
//   const rectangle = this;
//   const rectangleCoordinates = rectangle.coordinates.map((coord) => ({
//     lat: coord.lat,
//     lng: coord.lng,
//   }));
//   const googleBounds = new google.maps.LatLngBounds();
//   rectangleCoordinates.forEach((coord) => {
//     googleBounds.extend(new google.maps.LatLng(coord.lat, coord.lng));
//   });
//   const area = google.maps.geometry.spherical.computeArea(
//     googleBounds.getNorthEast(),
//     googleBounds.getSouthWest()
//   );
//   rectangle.area = area;
//   next();
// });

const adminSchema = new mongoose.Schema({
  userName: { type: String, unique: true, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => /.@./.test(v),
      message: "Email must contain @",
    },
  },
  phone: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  marks: [
    {
      lng: { type: Number },
      lat: { type: Number },
      markType: {
        type: String,
        enum: [
          "Police Station",
          "Beit Chabad",
          "Hospital",
          "Israeli Embassy",
          "Camping Site",
          "Hiking Trail",
          "Other",
        ],
      },
      found: { type: String },
      information: { type: String },
    },
  ],
  shapes: [
    {
      polygons: [polygonSchema],
      polylines: [polylineSchema],
      rectangles: [rectangleSchema],
      circles: [circleSchema],
    },
  ],
});

module.exports = mongoose.model("Admin", adminSchema);
