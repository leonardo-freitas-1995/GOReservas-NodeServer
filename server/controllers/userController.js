var encryption = require('../services/encryption');


module.exports =  function(app){

    var User = app.models.user;
    var Session = app.db;

    var controller = {};

    controller.createAccount = function (req, res, next){
        var userData = req.body;
        userData.salt = encryption.createSalt();
        userData.password = encryption.hashPwd(userData.salt, userData.password);
        userData.role = "client";

        Session.query(User).where(User.email.Equal(userData.email)).then(function(result){
            if (result.length){
                res.send({success: false, reason: "duplicated"});
            }
            else{
                User.Insert(userData).then(function(){
                   res.send({success: true});
                }).catch(function (error) {
                    res.send({success: false, reason: "error"});
                });
            }
        }).catch(function (error) {
            res.send({success: false, reason: "error"});
        });
    };

    controller.authenticateUser = function (req, res) {
        var email = req.body.email;
        var password = req.body.password;

        Session.query(User).where(User.email.Equal(email)).then(function(result){
            if (result.length){
                var user = result[0];
                if (user.password === encryption.hashPwd(user.salt, password)){
                    res.send({success: true});
                }
                else{
                    res.send({success: false});
                }
            }
            else{
                res.send({success: false});
            }
        }).catch(function (error) {
            res.send({success: false});
        });
    };

    controller.updateUser = function (req, res) {
        var email = req.params.email;
        var userData = req.body;
        var passwordQuery = "";
        if (userData.password !== ""){
            var salt = encryption.createSalt();
            var password = encryption.hashPwd(salt, userData.password);
            passwordQuery = ",salt='" + salt + "',password='" + password + "'";
        }
        else{
            delete userData.password;
        }
        Session.executeSql("UPDATE user SET name='" + userData.name + "'" + passwordQuery + " WHERE email='" + email + "'")
            .then(function(result){
                res.send({success: true});
        }).catch(function(error) {
            res.send({success: false, reason: "error"});
        });
    };

    return controller;
};
