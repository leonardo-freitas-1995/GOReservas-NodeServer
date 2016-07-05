module.exports =  function(app){

    var Reserve = app.models.reserve;
    var Business = app.models.business;
    var Session = app.db;

    var controller = {};

    controller.createReserve = function(req, res){
        var reserveData = req.body;
        reserveData.showedUp = 0;
        reserveData.confirmed = 0;
        var fullDate = new Date(reserveData.date);
        if (fullDate.getTime() - (new Date()).getTime() < (1000*60*60)){
            return res.send({success: false, reason: "ahead of time"});
        }

        Session.query(Business).where(Business.id.Equal(reserveData.business)).then(function(result){
            if (result.length){
                var businessDoc = result[0];
                if (businessDoc.autoAccept){
                    reserveData.confirmed = 1;
                }
                Reserve.Insert(reserveData).then(function(){
                    res.send({success: true, confirmed: reserveData.confirmed});
                }).catch(function (error) {
                    res.send({success: false, reason: "error"});
                });
            }
            else{
                res.send({success: false});
            }
        }).catch(function (error) {
            res.send({success: false, reason: "error"});
        });

    };

    controller.cancelReserve = function(req, res){
        var id = req.params.id;
        var date = new Date(req.params.date);
        if ((new Date()).getTime() > date.getTime()){
            return res.send({success: false, reason: "ahead of time"});
        }
        Session.executeSql("DELETE FROM reserve WHERE id='" + id + "'")
            .then(function(){
                res.send({success: true});
            }).catch(function(error) {
            res.send({success: false, reason: "error"});
        });
    };

    controller.getOneReserve = function(req, res){
        var client = req.params.client;
        var id = req.params.id;
        Session.executeSql("SELECT * FROM reserve WHERE client = '" + client + "' AND id = '" + id + "'").then(function(result){
            if (result.length === 0){
                return res.send({success: false, reason: "error"});
            }
            var reserve = result[0];
            Session.executeSql("SELECT id,name,rating,imageURL,latitude,longitude FROM business WHERE id = '" + reserve.business + "'")
                .then(function(businessResult){
                    reserve.business = businessResult[0];
                    res.send({success: true, data: reserve});
                }).catch(function (error) {
                res.send({success: false, reason: "error"});
            });
        }).catch(function (error) {
            res.send({success: false, reason: "error"});
        });
    };

    controller.getReserves = function(req, res){
        var id = req.params.id;
        Session.executeSql("SELECT * FROM reserve WHERE client = '" + id + "' ORDER BY date DESC").then(function(result){
            if (result.length === 0){
                return res.send({success: true, data: result});
            }
            var allBusiness = [];
            for (var r = 0; r < result.length; r++){
                allBusiness.push(result[r].business);
            }
            Session.executeSql("SELECT id,name,rating,imageURL FROM business WHERE id IN (" + allBusiness.join(", ") + ")")
                .then(function(businessResult){
                    var businessIndex = [];
                    for (var r = 0; r < businessResult.length; r++){
                        businessIndex[businessResult[r].id] = r;
                    }
                    for (var r = 0; r < result.length; r++){
                        result[r].business = businessResult[businessIndex[result[r].business]];
                    }
                    res.send({success: true, data: result});
                }).catch(function (error) {
                res.send({success: false, reason: "error"});
            });
        }).catch(function (error) {
            res.send({success: false, reason: "error"});
        });
    };

    controller.getLastReserves = function(req, res){
        var id = req.params.id;
        Session.executeSql("SELECT * FROM reserve WHERE client = '" + id + "' ORDER BY date DESC LIMIT 3").then(function(result){
            if (result.length === 0){
                return res.send({success: true, data: result});
            }
            var allBusiness = [];
            for (var r = 0; r < result.length; r++){
                allBusiness.push(result[r].business);
            }
            Session.executeSql("SELECT id,name,rating,imageURL FROM business WHERE id IN (" + allBusiness.join(", ") + ")")
                .then(function(businessResult){
                    var businessIndex = [];
                    for (var r = 0; r < businessResult.length; r++){
                        businessIndex[businessResult[r].id] = r;
                    }
                    for (var r = 0; r < result.length; r++){
                        result[r].business = businessResult[businessIndex[result[r].business]];
                    }
                    res.send({success: true, data: result});
                }).catch(function (error) {
                    res.send({success: false, reason: "error"});
                });

        }).catch(function (error) {
            res.send({success: false, reason: "error"});
        });
    };

    return controller;
};
