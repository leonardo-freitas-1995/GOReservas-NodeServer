    module.exports =  function(app){

    var Reserve = app.models.reserve;

    var controller = {};

    controller.createReserve = function (req, res) {
        var reserveData = req.body;
        Reserve.create(reserveData, function(err, newReserve){
            if (err){
                return res.send({success: false});
            }
            else{
                return res.send({success: true});
            }
        })
    };

    controller.cancelReserve = function (req, res) {
        var reserveId = req.params.id;
        Reserve.remove({_id: reserveId}).exec(function(err, doc){
            if (err){
                res.send({success: false});
            }
            else {
                res.send({success: true});
            }
        });
    };

    controller.confirmReserve = function (req, res) {
        var reserveId = req.params.id;
        Reserve.findOne({_id: reserveId}).exec(function(err, doc){
            if (err){
                res.send({success: false});
            }
            else {
                doc.confirmed = true;
                doc.save();
                res.send({success: true});
            }
        });
    };

    return controller;
};
