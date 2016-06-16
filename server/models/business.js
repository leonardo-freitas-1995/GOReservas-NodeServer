var mongoose = require('mongoose');

module.exports =  function(){

    var businessSchema = mongoose.Schema({
        owner: {
            type: mongoose.Schema.ObjectId,
            ref: 'user'
        },
        name: String,
        CNPJ: {
            type: Number,
            unique: true
        },
        sizeLimit: Number,
        minPerReserve: Number,
        maxPerReserve: Number,
        autoAccept: Boolean,
        pricePerReserve: Number,
        pricePerPerson: Number,
        rating: number,
        blacklist: [{
            type: mongoose.Schema.ObjectId,
            ref: 'user'
        }]
    });


    return mongoose.model('Business', businessSchema);
};
