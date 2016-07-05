module.exports =  function(app){

    return app.db.tableMap('reserve')
        .columnMap('id', 'id', { isAutoIncrement: true })
        .columnMap('client', 'client')
        .columnMap('business', 'business')
        .columnMap('date', 'date')
        .columnMap('observation', 'observation')
        .columnMap('showedUp', 'showedUp')
        .columnMap('quantity', 'quantity')
        .columnMap('confirmed', 'confirmed')
        .columnMap('totalValue', 'totalValue')
        .columnMap('rated', 'rated')
        .columnMap('rating', 'rating');

};
