module.exports =  function(app){

    return app.db.tableMap('user')
        .columnMap('id', 'id', { isAutoIncrement: true })
        .columnMap('email', 'email')
        .columnMap('name', 'name')
        .columnMap('salt', 'salt')
        .columnMap('password', 'password')
        .columnMap('role', 'role');

};
