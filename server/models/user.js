var mongoose = require('mongoose'),
    encryption = require('../services/encryption');

module.exports =  function(){

    var userSchema = mongoose.Schema({
        name: String,
        email: {
            type: String,
            unique: true
        },
        salt: String,
        password: String,
        role: String
    });

    userSchema.methods = {
        authenticate: function (passwordToMatch) {
            return encryption.hashPwd(this.salt, passwordToMatch) === this.password;
        },
        hasRole: function(role) {
            return this.roles.indexOf(role) > -1;
        }
    };


    return mongoose.model('User', userSchema);
};
