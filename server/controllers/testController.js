var encryption = require('../services/encryption');

var testUser = {
    email: "teste@teste",
    password: "teste",
    name: "Teste"
};

module.exports =  function(app){

    var User = app.models.user;
    var Session = app.db;

    var controller = {};

    controller.createTestAccount = function (req, res){
        var userData = {
            email: testUser.email,
            password: testUser.password,
            name: testUser.name
        };
        userData.salt = encryption.createSalt();
        userData.password = encryption.hashPwd(userData.salt, userData.password);
        userData.role = "client";

        Session.query(User).where(User.email.Equal(userData.email)).then(function(result){
            if (result.length){
                Session.executeSql("DELETE FROM user WHERE email='" + userData.email + "'")
                .then(function(){
                    insertTestUser();
                });
            }
            else{
                insertTestUser();
            }
        });

        function insertTestUser(){
            User.Insert(userData).then(function(){
                res.send({success: true});
            }).catch(function (error) {
                res.send({success: false, reason: "error", error: error});
            });
        }
    };

    controller.removeTestAccount = function (req, res) {
        Session.executeSql("DELETE FROM user WHERE email='" + testUser.email + "'")
            .then(function(){
                res.send({success: true});
            }).catch(function(error) {
            res.send({success: false, reason: "error", error: error});
        });
    };

    return controller;
};
