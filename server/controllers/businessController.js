module.exports =  function(app){

    var Business = app.models.business;
    var Session = app.db;

    var controller = {};

    controller.getAllBusiness = function(req, res){
        Session.query(Business).select().then(function(result){
            res.send({success: true, data: result});
        }).catch(function (error) {
            res.send({success: false, reason: "error"});
        });
    };

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
            res.send({success: false, reason: "error"});
        });
    };

    controller.searchBusiness = function(req, res){
        var search = req.params.search;
        var filter = req.params.filter.split(",").filter(function(val){return val !== ""});
        if (search === "%all%")
            search = "";
        var query = "SELECT id,name,rating,imageURL FROM business WHERE name LIKE '%" + search + "%' AND businessType IN (" + filter.join(", ") + ") ORDER BY rating DESC";
        console.log(query);
        Session.executeSql(query).then(function(result){
            console.log(result);
            res.send({success: true, data: result});

        }).catch(function (error) {
            res.send({success: false, reason: "error"});
        });
    };

    return controller;
};
