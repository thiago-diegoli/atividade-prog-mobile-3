# Projeto React Native com Backend Express Integrado

Este projeto é uma aplicação que utiliza **React Native** no frontend e **Express** no backend, integrados através de requisições HTTP RESTful utilizando **Axios**. O frontend e o backend estão em um único repositório, facilitando o desenvolvimento e integração da aplicação.

## Estrutura do Projeto

A estrutura do projeto é dividida em duas principais pastas:

- **`/API`**: Contém o backend Express com as rotas, controladores e lógica de negócios.
- **`/`**: Contém o frontend React Native que faz as requisições para o backend.

## Funcionalidade da Integração

O frontend (React Native) interage com o backend (Express) utilizando o Axios, que é configurado para fazer requisições HTTP RESTful. As principais operações do projeto, como login, cadastro e manipulação de projetos e tarefas, são realizadas através dessas requisições.

### Exemplos de integração:

- O React Native faz uma requisição `POST` para o backend para realizar o login do usuário.
- O backend, por sua vez, responde com um token JWT, que é armazenado no cliente para autenticação em requisições subsequentes.
- O React Native pode então fazer requisições `GET`, `POST`, `PUT`, `DELETE` para o backend para gerenciar projetos e tarefas.

## Rodando o Projeto

### Backend

Para rodar o backend, siga os passos abaixo:

1. Navegue até a pasta do backend:

   ```bash
   cd api
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o backend:
   ```bash
   node index.js
   ```

O backend estará rodando e disponível para o frontend fazer as requisições HTTP.

### Frontend (React Native)

Para rodar o frontend, siga os passos abaixo:

1. Navegue até a pasta do frontend (pasta raíz)

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Para rodar a versão web da aplicação:
   ```bash
   npm run web
   ```

Isso iniciará o aplicativo React Native na versão web.

## Conclusão

Este projeto oferece uma integração simples entre React Native no frontend e Express no backend, com Axios para realizar as requisições HTTP RESTful. O backend pode ser executado localmente utilizando `node index.js` e o frontend pode ser rodado utilizando `npm run web`.
