const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, ref: 'Department' }
});

module.exports = mongoose.model('Department', departmentSchema);