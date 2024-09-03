const mongoose = require("mongoose");

const Employee = mongoose.model("Employee", {
    FirstName: String,
    LastName: String,
    Age: Number,
    DateOfJoining: Date,
    Title: String,
    Department: String,
    EmployeeType: String,
    CurrentStatus: Boolean
});

module.exports = { Employee };