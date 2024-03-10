const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  phoneNo: { type: String, require: true },
  
});



const UserModel = mongoose.model("blogUser", userSchema);

module.exports = UserModel;