module.exports = {
    host: "http://localhost:3030/",
    testAPI: {
        addUser: "api/test/createTestUser",
        removeUser: "api/test/cleanTestUser",
        addBusiness: "api/test/createTestBusiness",
        removeBusiness: "api/test/cleanTestBusiness",
        addReserve: "api/test/createTestReserve",
        addUsedReserve: "api/test/createUsedTestReserve",
        removeReserve: "api/test/cleanTestReserve"
    },
    pages: {
        index: "index",
        dashboard: "dashboard",
        business: "business",
        reserve: "reserve",
        afterLogout: "index#!"
    },
    testUser: {
        id: 0,
        email: "teste@teste",
        password: "teste",
        name: "Teste"
    },
    testBusiness: {
        id: 0,
        name: "Estabelecimento de teste",
        description: "Um estabelecimento de teste para uso do Protractor.",
        businessType: "entertainment",
        CNPJ: 0,
        minPerReserve: 2,
        maxPerReserve: 6
    },
    testReserve: {
        id: 0,
        client: 0,
        business: 0,
        day: "31/12/9999",
        hour: "23:59",
        observation: "Esta é uma reserva de teste",
        quantity: 5
    }
};