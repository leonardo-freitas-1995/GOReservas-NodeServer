var encryption = require('../services/encryption'),
emailAgent = require('../services/emailAgent');


module.exports =  function(app){

    var User = app.models.user;

    var controller = {};

    controller.startAccount = function (req, res, next){
        var email = req.params.email;
        var salt = encryption.createSalt();
        var token = encryption.randomPassword();
        var userData = {
            email: email,
            salt: salt,
            password: encryption.hashPwd(salt, token),
            role: "client",
            name: req.params.email
        };
        User.findOne({email: email}).exec(function(err, doc){
            if (doc){
                return res.send({success: false, reason: 'signup.error.alreadyRegister'});
            }
            else{
                User.create(userData);
                sendEmailInvite();
                return res.send({success: true});
            }
        });

        function sendEmailInvite(){
            emailAgent.sendEmail(
                email,
                "GOReservas - Criação de Conta",
                "Bem vindo ao GOReservas!",
                'http://' + req.headers.host
            );
        }
    };

    controller.updateUser = function (req, res) {
        var userUpdates = req.body;

        User.findById(userUpdates._id, function(err, data) {
            if (err) {
                res.status(400);
                return res.send({success: false, reason: "common.connectionError"});
            }

            if (userUpdates.password && userUpdates.password.length > 0) {
                data.salt = encryption.createSalt();
                data.password = encryption.hashPwd(data.salt, userUpdates.password);
            }

            data.name = userUpdates.name || data.name;
            data.email = userUpdates.email || data.email;
            data.email = data.email.toLowerCase();
            data.set('invitationDate', null);

            data.save(function (err) {
                if (err) {
                    res.status(400);
                    return res.send({success: false, reason: "common.connectionError"});
                }

                data.salt = undefined;
                data.password = undefined;

                res.send(data);
            });
        });
    };

    return controller;
};
