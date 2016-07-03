module.exports =  function(){

    return app.db.tableMap('User')
        .columnMap('client', 'client')
        .columnMap('business', 'business')
        .columnMap('date', 'date')
        .columnMap('observation', 'observation')
        .columnMap('showedUp', 'showedUp')
        .columnMap('quantity', 'quantity')
        .columnMap('confirmed', 'confirmed')
        .columnMap('totalValue', 'totalValue');
    
};
