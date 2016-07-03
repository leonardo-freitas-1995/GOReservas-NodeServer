module.exports =  function(app){

    var Reserve = app.models.reserve;
    var Business = app.models.business;
    var Session = app.db;

    var controller = {};

    controller.createReserve = function(req, res){
        var reserveData = req.body;
        reserveData.showedUp = false;
        reserveData.confirmed = false;

        Session.query(Business).where(Business.id.Equal(reserveData.business)).then(function(result){
            if (result.length){
                var businessDoc = result[0];
                if (businessDoc.autoAccept){
                    reserveData.confirmed = true;
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
        Session.executeSql("DELETE FROM reserve WHERE id='" + id + "'")
            .then(function(){
                res.send({success: true});
            }).catch(function(error) {
            console.log(error);
            res.send({success: false, reason: "error"});
        });
    };

    controller.getReserves = function(req, res){
        var id = req.params.id;
        Session.query(Reserve).where(Reserve.client.Equal(id)).then(function(result){
            res.send({success: true, data: result});
        }).catch(function (error) {
            res.send({success: false, reason: "error"});
        });
    };

    return controller;
};
