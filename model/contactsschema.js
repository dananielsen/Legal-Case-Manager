import mongoose from  "mongoose"

const ContactSchema = new mongoose.Schema({
    name: {
      firstName: String,
      lastName: String,
      middleInitial: String,
    },
    companyName: String, // Singular field for the company name
    email: String,
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
    },
    website: String,
    notes: String,
    type: {
      type: String,
      enum: ['Client', 'Expert', 'Company', 'General'],
      required: true,
    },
  });
  
  const Contact = mongoose.model('Contact', ContactSchema);
  
  module.exports = Contact;