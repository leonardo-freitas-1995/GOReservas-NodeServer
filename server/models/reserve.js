var mongoose = require('mongoose');

module.exports =  function(){

    var reserveSchema = mongoose.Schema({
        client: {
            type: mongoose.Schema.ObjectId,
            ref: 'user'
        },
        business: {
            type: mongoose.Schema.ObjectId,
            ref: 'business'
        },
        date: Date,
        observation: String,
        showedUp: Boolean,
        quantity: Number,
        confirmed: Boolean,
        totalValue: Number
    });


    return mongoose.model('Reserve', reserveSchema);
};
