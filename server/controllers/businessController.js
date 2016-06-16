module.exports =  function(app){

    var Business = app.models.reserve;

    var controller = {};

    controller.createBusiness = function (req, res) {
        var businessData = req.body;
        Business.create(businessData, function(err, newReserve){
            if (err){
                return res.send({success: false});
            }
            else{
                return res.send({success: true});
            }
        })
    };

    controller.deleteBusiness = function (req, res) {
        var reserveId = req.params.id;
        Business.remove({_id: reserveId}).exec(function(err, doc){
            if (err){
                res.send({success: false});
            }
            else {
                res.send({success: true});
            }
        });
    };

    controller.getBusiness = function (req, res) {
        var businessId = req.params.id;
        Business.findOne({_id: businessId}).exec(function(err, doc){
            if (err){
                res.send({success: false});
            }
            else {
                res.send({success: true, data: doc});
            }
        });
    };

    return controller;
};
