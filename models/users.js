//require mongoose
var mongoose = require('mongoose');

//require bcrypt
bcrypt = require('bcrypt-nodejs');

//make user schema in mongoose
var userSchema = mongoose.Schema({

	//username
	username: String,

	//password
	password: String,

	//points
	points: Number,

	//questions played
	questions: Number,

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
//export user schema
module.exports = mongoose.model('User', userSchema);