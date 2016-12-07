module.exports = {
    host: "http://localhost:3030/",
    testAPI: {
        addUser: "api/test/createTestUser",
        removeUser: "api/test/cleanTestUser",
        addBusiness: "api/test/createTestBusiness",
        removeBusiness: "api/test/cleanTestBusiness",
        addReserve: "api/test/createTestReserve",
        removeReserve: "api/test/cleanTestReserve"
    },
    pages: {
        index: "index",
        dashboard: "dashboard",
        business: "business",
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
    testReserveNotUsed: {
        id: 0,
        client: 0,
        business: 0,
        date: "9999-12-31 23:59:59",
        observation: "Esta é uma reserva de teste",
        showedUp: 0,
        quantity: 5,
        confirmed: 1,
        totalValue: 0,
        rated: 0
    },
    testReserveUsed: {
        id: 0,
        client: 0,
        business: 0,
        date: "9999-12-31 23:59:59",
        observation: "Esta é uma reserva de teste",
        showedUp: 1,
        quantity: 5,
        confirmed: 1,
        totalValue: 0,
        rated: 1,
        rating: 4
    }
};