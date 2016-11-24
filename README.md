# Go Reservas - Node Server 

Projeto da matéria de Desenvolvimento de Software para Web 2016/1 da Universidade Federal de Goiás.

### Requisitos
- Servidor Node.js
- Bower instalado via NPM
- MySQL Server

### Como configurar o ambiente

Após realizar o clone do repositório, resolva as dependências server-side do projeto utilizando:
> npm install

Depois, resolva as dependências client-side utilizando:
> bower install

### Como configurar o banco

Para configurar o banco de dados, utilize o arquivo `mysql-config/sql-ddl.sql` contendo os comandos SQL para criar as tabelas, e o arquivo `mysql-config/sql-dml.sql` contendo comandos SQL para adicionar tuplas na tabela `business`.

### Como iniciar o servidor

Após configurar o ambiente e o banco, inicie o servidor utilizando
> npm start
