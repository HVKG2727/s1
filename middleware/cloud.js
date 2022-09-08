const cloudinary = require('cloudinary')

cloudinary.config({ 
    cloud_name: 'be-practicle-tech-solutions', 
    api_key: '821936589872421', 
    api_secret: 'skjR0RXLNs4FiMO_c9XTJadXcbw' 
  });

  module.exports = cloudinary