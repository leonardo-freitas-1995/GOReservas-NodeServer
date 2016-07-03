module.exports =  function(app){

    return app.db.tableMap('User')
        .columnMap('id', 'id', { isAutoIncrement: true })
        .columnMap('name', 'name')
        .columnMap('salt', 'salt')
        .columnMap('password', 'password')
        .columnMap('role', 'role');

};
