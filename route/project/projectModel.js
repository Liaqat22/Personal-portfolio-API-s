const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    
      
    name: {
      type: String,
      required: true,
    },
   
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  

   
    photo: {
      data: Buffer,
      contentType: String,
    },
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Projects", projectSchema);