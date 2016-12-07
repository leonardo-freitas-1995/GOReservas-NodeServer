module.exports = {
    host: "http://localhost:3030/",
    testAPI: {
        addUser: "api/test/createTestUser",
        removeUser: "api/test/cleanTestUser"
    },
    pages: {
        index: "index",
        dashboard: "dashboard",
        afterLogout: "index#!"
    },
    testUser: {
        email: "teste@teste",
        password: "teste",
        name: "Teste"
    }
};