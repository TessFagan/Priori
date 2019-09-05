const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');
mongoose.promise = Promise

var userSchema = new Schema({
  username: { type: String, unique: false, required: false },
  password: { type: String, unique: false, required: false },
  priorities: { type: Array, "default": [] },
  todos: { type: Array, "default": [] }
});


// Define schema methods
userSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password)
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10)
  }
}

// Define hooks for pre-saving
userSchema.pre('save', function (next) {
  if (!this.password) {
    console.log('models/user.js =======NO PASSWORD PROVIDED=======')
    next()
  } else {
    console.log('models/user.js hashPassword in pre save');

    this.password = this.hashPassword(this.password)
    next()
  }
})

// This creates our model from the above schema, using mongoose's model method
const User = mongoose.model("User", userSchema);

// test user document
// var silence = new User({ name: 'Silence', password: "123" });
// console.log(silence.name); // 'Silence'

// silence.save(function (err, silence) {
//   if (err) return console.error(err);
//   console.log("something happened")
// });
//console.log("something happened")

// access all of the user documents through our User model.
// User.find(function (err, users) {
//   if (err) return console.error(err);
//   console.log(users);
// })


// Export the User model
module.exports = User;
