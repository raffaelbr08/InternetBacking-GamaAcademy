# Internet Banking

## Tópicos
* [Requerimentos](#requerimentos)
* [Instalação](#instalacao)
* [Pastas do projeto](#pastas-do-projeto)
* [Api](#api)
    * [Consultando](#consultando-a-api)
* [Banco de dados](#banco-de-dados)
    * [Consultando](#consultando-os-dados)

## Requerimentos
* node (versão >= 8.9.4)
    ```bash
        $ node -v
        v8.9.4
    ```
* npm (versão >= 5.6.0)
    ```bash
        $ npm -v
        5.6.0
    ```

* @angular/cli (versão >= 1.6.3)
    ```bash
        $ ng -v
            _                      _                 ____ _     ___
           / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
          / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
         / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
        /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                       |___/
        Angular CLI: 1.6.3
        Node: 8.9.4
        ...

    ```

## Instalação

* node

    Acessar o link e seguir os passos:
    
    [NodeJS](https://nodejs.org/en/download/)
    
* npm

    Npm já vem instalado com o nodejs. Caso não esteja instalado acessar: [NPM](https://www.npmjs.com/get-npm)
    
* MongoDB
   Fazer download
   https://www.mongodb.com/download-center?jmp=nav#community
   
   Abrir Painel de controles >> sistema >> Variaveis de ambiente
   Editar a variavel: Path
   Clicar em novo e adicionar o caminho do mongo/bin
   
   Iniciar o banco no prompt: mongod
   Abrir o banco no prompt: mongo
  
* node-mongo-seeds
   Necessário para população de dados no banco
   
   Run ```$ npm install -g node-mongo-seeds```
   
   Altere os arquivos .json na pasta seed
   
   Run ```$seed```
   
* @angular/cli

    Acessar o link e seguir os passos:
    
    [@angular/cli](https://github.com/angular/angular-cli#installation)

## Pastas do projeto

Cada pasta representa um "módulo" do projeto, onde:

* api, arquivos para a api;
* <NOMEDAPASTA> projeto em angular.



## Api
### Consultando a api
   Para iniciar a api no Pompt rodar dentro da pasta Node: npm run build
   Usar Postman para testar a aplicação
   
### Rotas:

   #### __/v1/login__ : primeira rota para logar e conseguir o token
  ```
  method: post
  Headers: "content-type" : "application/json"
  Body: {cpf: <Number>, senha: <String> }
  ```
   
   #### __/v1/*__ : qualquer rota pra frente você precisa inserir um header com o nome de "x-access-token" e no conteudo você passa o valor do token devolvido.

   #### __/v1/correntistas/__ : rota para acessar os correntistas correntistas
   ```
   method: get.
   Headers: "content-type" : "application/json"
   ```

   #### __/v1/correntistas/:cpf__
    ```
    method: post.
    Headers: "content-type" : "application/json"
    ```
      
      
    
## Banco de dados
    TODO:
### Consultando os dados
    TODO: //mongod ou postman
