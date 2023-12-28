import mongoose from  "mongoose"

// Define the Case Schema
const caseSchema = new mongoose.Schema({
  caseNumber: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  client: {
    type: String,
    required: true,
  },
  practiceArea: {
    type: String,
    enum: ['Criminal', 'Family', 'Traffic', 'Personal Injury', 'DWI/DUI', 'Court Appointed', 'Estates'],
    required: true
  },
  status: {
    type: String,
    enum: ['Open', 'Closed', 'Pending'],
    default: 'Open',
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user this case is assigned to
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
  // You can add more fields as needed...
});

// Create a Case model using the schema
const Case = mongoose.model('Case', caseSchema);

module.exports = Case;
