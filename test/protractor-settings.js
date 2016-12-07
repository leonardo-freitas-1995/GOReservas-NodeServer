module.exports = {
    host: "http://localhost:3030/",
    testAPI: {
        addUser: "api/test/createTestUser",
        removeUser: "api/test/cleanTestUser",
        addBusiness: "api/test/createTestBusiness",
        removeBusiness: "api/test/cleanTestBusiness"
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
    }
};