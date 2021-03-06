module.exports =  function(app){

    var Session = app.db;

    var controller = {};

    controller.getBusiness = function(req, res){
        var id = req.params.id;
        Session.executeSql("SELECT * FROM business WHERE id='" + id + "'").then(function(result){
            if (result.length){
                res.send({success: true, data: result[0]});
            }
            else{
                res.send({success: true, data: null});
            }
        }).catch(function (error) {
            res.send({success: false, reason: "error", error: error});
        });
    };

    controller.searchBusiness = function(req, res){
        var search = req.params.search;
        var filter = req.params.filter.split(",").filter(function(val){return val !== ""});
        if (search === "%all%")
            search = "";
        var query = "SELECT id,name,rating,imageURL FROM business WHERE name LIKE '%" + search + "%' AND businessType IN (" + filter.join(", ") + ") ORDER BY rating DESC";
        Session.executeSql(query).then(function(result){
            res.send({success: true, data: result});

        }).catch(function (error) {
            res.send({success: false, reason: "error", error: error});
        });
    };

    controller.getBestBusiness = function(req, res){
        var query = "SELECT id,name,rating,imageURL FROM business ORDER BY rating DESC LIMIT 3";
        Session.executeSql(query).then(function(result){
            res.send({success: true, data: result});

        }).catch(function (error) {
            res.send({success: false, reason: "error", error: error});
        });
    };

    return controller;
};
