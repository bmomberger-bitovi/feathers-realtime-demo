# feathers-realtime-react-demo

> Demo server for the Feathers Realtime demo for the React team

## About

This project uses [Feathers](http://feathersjs.com). An open source framework for building APIs and real-time applications.

## Getting Started

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd server
    npm install
    ```
3. Create a database
In postgresql
```
    create database <your system user name>;
    use database <your system user name>;
    create table teams( id INTEGER NOT NULL PRIMARY KEY, name VARCHAR(255) NOT NULL);
    create table scores( id INTEGER NOT NULL PRIMARY KEY, team1 INTEGER NOT NULL, team2 INTEGER NOT NULL, score1 INTEGER NOT NULL, score2 INTEGER NOT NULL, CONSTRAINT fk_team_1 FOREIGN KEY (team1) REFERENCES teams (id) ON DELETE CASCADE, CONSTRAINT fk_team_2 FOREIGN KEY  (team2) REFERENCES teams (id) ON DELETE CASCADE);
```
4. Set your database connection string in config/default.json:
```
  "postgresql": {
    "client": "pg",
    "connection": "postgres://<your system user name>@localhost:5432/<your system user name>"
  }
```
5. Start your app

    ```
    npm start
    ```

## Scaffolding

This app comes with a powerful command line interface for Feathers. Here are a few things it can do:

```
$ npx feathers help                           # Show all commands
$ npx feathers generate service               # Generate a new Service
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).
