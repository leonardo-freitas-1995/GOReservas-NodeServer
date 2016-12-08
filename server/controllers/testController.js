var encryption = require('../services/encryption');

var testUser = {
    id: 0,
    email: "teste@teste",
    password: "teste",
    name: "Teste"
};

var testBusiness = {
    id: 0,
    name: "Estabelecimento de teste",
    description: "Um estabelecimento de teste para uso do Protractor.",
    businessType: "entertainment",
    CNPJ: 0,
    sizeLimit: 36,
    minPerReserve: 2,
    maxPerReserve: 6,
    autoAccept: 1,
    pricePerReserve: 79,
    pricePerPerson: 0,
    avaliations: 7,
    rating: 4,
    latitude: "-16.603672225134293",
    longitude: "-49.26692247390747",
    imageURL: "http://www.cc30anos.inf.ufg.br/images/me.jpg"
};

var testReserve = {
    id: 0,
    client: 0,
    business: 0,
    date: "9999-12-31 23:59:00",
    observation: "Esta é uma reserva de teste",
    showedUp: 0,
    quantity: 5,
    confirmed: 1,
    totalValue: 0,
    rated: 0
};

var testUserReserve = {
    id: 0,
    client: 0,
    business: 0,
    date: "9999-12-31 23:59:00",
    observation: "Esta é uma reserva de teste",
    showedUp: 1,
    quantity: 5,
    confirmed: 1,
    totalValue: 0,
    rated: 1,
    rating: 4
};

module.exports =  function(app){

    var User = app.models.user;
    var Business = app.models.business;
    var Reserve = app.models.reserve;
    var Session = app.db;

    var controller = {};

    controller.createTestAccount = function (req, res){
        var userData = JSON.parse(JSON.stringify(testUser));
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
                Session.executeSql("UPDATE user SET id='" + userData.id + "'" + " WHERE email='" + userData.email + "'")
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

    controller.createTestBusiness = function (req, res){
        var businessData = JSON.parse(JSON.stringify(testBusiness));

        Session.query(Business).where(Business.id.Equal(businessData.id)).then(function(result){
            if (result.length){
                Session.executeSql("DELETE FROM business WHERE id=" + businessData.id + "")
                    .then(function(){
                        insertTestUser();
                    });
            }
            else{
                insertTestUser();
            }
        });

        function insertTestUser(){
            Business.Insert(businessData).then(function(){
                Session.executeSql("UPDATE business SET id='" + businessData.id + "'" + " WHERE name='" + businessData.name + "'")
                res.send({success: true});
            }).catch(function (error) {
                res.send({success: false, reason: "error", error: error});
            });
        }
    };

    controller.removeTestBusiness = function (req, res) {
        Session.executeSql("DELETE FROM business WHERE id=" + testBusiness.id + "")
            .then(function(){
                res.send({success: true});
            }).catch(function(error) {
            res.send({success: false, reason: "error", error: error});
        });
    };

    controller.createTestReserve = function (req, res){
        var reserveData = JSON.parse(JSON.stringify(testReserve));

        Session.query(Reserve).where(Reserve.id.Equal(reserveData.id)).then(function(result){
            if (result.length){
                Session.executeSql("DELETE FROM reserve WHERE date=" + reserveData.date + "")
                    .then(function(){
                        insertTestUser();
                    });
            }
            else{
                insertTestUser();
            }
        });

        function insertTestUser(){
            Reserve.Insert(reserveData).then(function(){
                Session.executeSql("UPDATE reserve SET id='" + reserveData.id + "'" + " WHERE date='" + reserveData.date + "'")
                res.send({success: true});
            }).catch(function (error) {
                res.send({success: false, reason: "error", error: error});
            });
        }
    };

    controller.removeTestReserve = function (req, res) {
        Session.executeSql("DELETE FROM reserve WHERE date=" + testReserve.date + "")
            .then(function(){
                res.send({success: true});
            }).catch(function(error) {
            res.send({success: false, reason: "error", error: error});
        });
    };

    return controller;
};
