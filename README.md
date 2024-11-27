# Atividade React Native com Backend Express Integrado

Esta atividade é uma aplicação que utiliza **React Native** no frontend e **Express** no backend, integrados através de requisições HTTP RESTful utilizando **Axios**. O frontend e o backend estão em um único repositório, facilitando o desenvolvimento e integração da aplicação.

## Estrutura da Atividade

A estrutura da atividade é dividida em duas principais pastas:

- **`/API`**: Contém o backend Express com as rotas CRUD.
- **`/`**: Contém o frontend React Native que faz as requisições para o backend.

## Funcionalidade da Integração

O frontend (React Native) interage com o backend (Express) utilizando o Axios, que é configurado para fazer requisições HTTP RESTful.

## Rodando o App

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

Este app oferece uma integração simples entre React Native no frontend e Express no backend, com Axios para realizar as requisições HTTP RESTful. O backend pode ser executado localmente utilizando `node index.js` e o frontend pode ser rodado utilizando `npm run web`.
