module.exports =  function(app){

    return app.db.tableMap('User')
        .columnMap('id', 'id', { isAutoIncrement: true })
        .columnMap('owner', 'owner')
        .columnMap('name', 'name')
        .columnMap('CNPJ', 'CNPJ')
        .columnMap('sizeLimit', 'sizeLimit')
        .columnMap('minPerReserve', 'minPerReserve')
        .columnMap('maxPerReserve', 'maxPerReserve')
        .columnMap('autoAccept', 'autoAccept')
        .columnMap('pricePerReserve', 'pricePerReserve')
        .columnMap('pricePerPerson', 'pricePerPerson')
        .columnMap('rating', 'rating');
};
