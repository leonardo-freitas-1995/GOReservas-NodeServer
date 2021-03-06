module.exports =  function(app){

    return app.db.tableMap('business')
        .columnMap('id', 'id', { isAutoIncrement: true })
        .columnMap('owner', 'owner')
        .columnMap('name', 'name')
        .columnMap('description', 'description')
        .columnMap('businessType', 'businessType')
        .columnMap('CNPJ', 'CNPJ')
        .columnMap('sizeLimit', 'sizeLimit')
        .columnMap('minPerReserve', 'minPerReserve')
        .columnMap('maxPerReserve', 'maxPerReserve')
        .columnMap('autoAccept', 'autoAccept')
        .columnMap('pricePerReserve', 'pricePerReserve')
        .columnMap('pricePerPerson', 'pricePerPerson')
        .columnMap('avaliations', 'avaliations')
        .columnMap('rating', 'rating')
        .columnMap('latitude', 'latitude')
        .columnMap('longitude', 'longitude')
        .columnMap('imageURL', 'imageURL');
};
