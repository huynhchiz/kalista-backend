import dotenv from 'dotenv'
dotenv.config()

const cloudinary = require("cloudinary").v2;

const cloud_name = process.env.CLOUD_NAME || 'drk6juqrs';
const api_key = process.env.API_KEY || '719529885538695';
const api_secret = process.env.API_SECRET || 'qJ0CYjEHZOWiutEvL6lcZkPDWVM';

cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
});

module.exports = { cloudinary }

// const dotenv = require("dotenv");
// dotenv.config();
// const cloudinary = require("cloudinary").v2;
// cloudinary.config({
//   cloud_name: cloud_name,
//   api_key: api_key,
//   api_secret: api_secret,
// });

// module.exports= { cloudinary };