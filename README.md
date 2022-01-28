# Twitter Clone Server

Its a web server that saves user's information and lets users share twitters. It gives the ability for user's to follow other users.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NODE_ENV`

`POST` The port that the server will be running out

`MYSQL_HOST` The port of the MySQL database

`MYSQL_DATABASE` The name of the database

`MYSQL_USER` The username of the MySQL database

`MYSQL_PASSWORD` The password to access the MySQL Database

`JWT_SECRET` The base64 key to generate JWT Token

## Run Locally

Clone the project

```bash
  git clone https://github.com/GiovannyRoman101/twitter_server_clone.git
```

Go to the project directory

```bash
  cd twitter_server_clone
```

Install dependencies

```bash
  npm install
```

Build the project

```bash
  npm run build
```

Start the server

```bash
  npm run start
```

## API Reference

#### Create a new User

```http
  POST /api/users
```

| Parameter  | Type     | Description                           |
| :--------- | :------- | :------------------------------------ |
| `username` | `string` | **Required**. username of the account |
| `email`    | `string` | **Required**. email of the account    |
| `password` | `string` | **Required**. password of the account |

#### Generate login token

```http
  POST /api/login
```

| Parameter | Type       | Description                       |
| :-------- | :--------- | :-------------------------------- |
| `email`   | `password` | **Required**. Id of item to fetch |

#### Logs out user by clearing their jwt

```http
  GET /api/logout
```

#### Create a new Tweet

```http
  POST /api/users/tweets
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `message` | `string` | **Required**. message of the tweet |

## Tech Stack

**Server:** Node, Express, TypeScript, Redis, MySQL, TypeORM

## Authors

-   [@GiovannyRoman](https://github.com/GiovannyRoman101)
