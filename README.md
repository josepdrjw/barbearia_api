# Projeto API Para uma Barbearia!


<details>
  <summary><strong>👨‍💻 O que foi desenvolvido</strong></summary>

  Neste projeto desenvolvi uma API e um banco de dados para uma Barbearia. 

  Aplicação em `Node.js` usando o `expres` pacote `sequelize` `ORM` como  para fazer `CRUD`, e arquitetura MSC `controller, service, model`.

  1. Endpoints conectados ao banco de dados seguindo os princípios do REST;

  2. Para fazer um agendamento é necessário cadastrar um usuário e login; 

  3. Logica checa horarios disponivél do barbeiro selecionado para garantir a consistencia de datas e horarios;

  4. Redenfinição de senha com link com token enviado para email "checar se email informado existe na tabela clientes" expiração apos 10 minutos;

  5. Notificação via e-mail para o barbeiro informando o barbeiro contento nome do cliente, serviço e horario `via smtp`;

  6. Cancelamento de serviço agendado pelo cliente;

  7. Consulta agenda de dias posteriores do barbeiro;

  7. Consulta de faturamento individual mensal e por periodo;

<br />
</details>

<details>
  <summary><strong>⚠️ Informações importantes sobre o projeto</strong></summary>

  #### Arquivos importantes

  ⚠️ Essa pasta ainda conta com alguns arquivos auxiliares que serão consumidos pelo avaliador e **não devem ser apagados em nenhuma hipótese**:

  > `src/app.js`
  ```javascript
  const express = require('express');

  // ...

  const app = express();

  // não remova ou mova esse endpoint
  app.get('/', (_request, response) => {
    response.send();
  });

  app.use(express.json());

  // ...

  // É importante exportar a constante `app`,
  // para que possa ser utilizada pelo arquivo `src/server.js`
  module.exports = app;
  ```
  Que ficará responsável por receber **as definições de middlewares e rotas** de sua API

  <br />

  ---

  > 👉 `src/server.js`
  ```javascript
  require('dotenv').config();
  const app = require('./app');

  // não remova a variável `API_PORT` ou o `listen`
  const port = process.env.API_PORT || 3000;

  app.listen(port, () => console.log('ouvindo porta', port));
  ```
  Que ficará responsável por iniciar sua API

  <br />

  ---

  > 👉 `src/config/config.js`
  ```javascript
  require('dotenv').config();

  const environment = process.env.NODE_ENV || 'test';

  const suffix = {
    dev: '-dev',
    development: '-dev',
    test: '-test',
  };

  const options = {
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || '3306',
    database: 
      `${process.env.MYSQL_DB_NAME || 'barber_api_db'}${suffix[environment] || suffix.test}`,
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '1234',
    dialect: 'mysql',
    dialectOptions: {
      timezone: 'Z',
    },
    logging: process.env.DEBUG !== 'false',
  };

  module.exports = {
    development: {
      ...options,
    },
    test: {
      ...options,
    },
  };

  <br />
  <br />

  ---

  **È precisar configurar as variáveis de ambiente para uso do MySQL.** Você pode usar esse [Conteúdo de variáveis de ambiente com NodeJS] https://dev.to/pauloricardoz/usando-variaveis-de-ambiente-em-nodejs-env--4ioi) como referência.

  O arquivo a seguir, contém um modelo das variáveis de ambiente utilizadas no projeto. Para o contexto de teste local, é importante configurar as variáveis: `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`:

  > 👉 `.env.example`
  ```env
#### SERVER VARS
NODE_ENV=development
API_PORT=3000
API_HOST=localhost

#### DATABASE VARS
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DB_NAME=barber_api_db
MYSQL_USER=root
MYSQL_PASSWORD=barbervip

#### SECRECT VARS
JWT_SECRET=suaSenhaSecreta

  ```

  #### Variável `JWT_SECRET`:
  
  Esta variável de ambiente deverá ser utilizada tanto para criar o token quanto para verificá-lo. Os teste locais e o avaliador vão utilizar a variável de ambiente `JWT_SECRET` para testar os requisitos

<br />
</details>

<br />

## - O cadastro de cliente será no endpoint POST `/cadastro-clientes`

- O endpoint é acessível através do URL `/cadastro-clientes`;
- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
    "email": "cliente@gmail.com",
    "password": "123456"
  }
  ```

  ## - O Login do cliente será no endpoint POST `/login`

- O endpoint é acessível através do URL `/login`;
- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
    "email": "cleinte@gmail.com",
    "password": "123456"
  }
  ```

    ## - O Login do Barbeiro será no endpoint POST `/login-barber`

- O endpoint é acessível através do URL `/login-barber`;
- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
    "email": "barbeiro@gmail.com",
    "password": "123456"
  }
  ```

    ## - Lista os barbeiros para que o usuario selecione no endpoint GET `/barbeiros`

- O endpoint é acessível através do URL `/barbeiros`;

<details>
  <summary><strong>Todas as rotas possuem middlewares de validaões:</strong></summary>

  * **[Será validado que não é possível fazer login com um usuário que não existe]**
    - Se a requisição receber um par de `email` e `password` errados/inexistentes, o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "Invalid fields"
    }
    ```
  
  * **[Será validado que é possível fazer login com sucesso]**
    - Se o login foi feito com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
    }
    ```
    > :warning: O token anterior é fictício, seu token deve ser gerado a partir da variável de ambiente `JWT_SECRET`, do `payload` da requisição e não deve conter o atributo `password` em sua construção.

<br />
</details>



