var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy
    encryption = require('../server/services/encryption');;

module.exports = function (app) {
    var User = app.models.user;
    var Session = app.db;

    passport.use(new LocalStrategy(
        function (username, password, done) {
            Session.query(User).where(User.email.Equal(username)).then(function(result){
                if (result.length){
                    var user = result[0];
                    if (user.password === encryption.hashPwd(user.salt, password)){
                        return done(null, user);
                    }
                    else{
                        done(null, false);
                    }
                }
                else{
                    done(null, false);
                }
            }).catch(function (error) {
                done(null, false);
            });
        }
    ));

    passport.serializeUser(function (user, done) {
        if (user) {
            done(null, user._id);
        }
    });

    passport.deserializeUser(function (id, done) {
        User.findOne({_id: id}).exec(function (err, user) {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    });
};
