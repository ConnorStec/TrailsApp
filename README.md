# Trails App
A simple app for storing and viewing trail records
## Getting Started
- Requires [NodeJS](https://nodejs.org/) and [PostgreSQL](https://www.postgresql.org/download/)
- Create a local .env file with keys for:
  - DB_USER - the database username the app will use to connect
  - DB_PASS - your chosen password for the above user
  - DB_NAME - name of the database for your app
- Create the database
  - Become postgres `sudo su postgres`
  - Enter the db shell `psql`
  - Create the db `create database [DB_NAME]`
  - Create your user and password `create user [DB_USER] with password [DB_PASS]`
  - `cd` into `/sql` and create DB tables `\i initdb.sql`
- Install app dependencies with `npm i`
  - The `postinstall` will install your browser dependencies automatically
- Start your servers
  - Development
    - `npm run serve` from /browser
    - `npm start` from the root
    - Access the app at localhost:8080
  - Production
    - `npm run build` from /browser
    - `npm start` from root
    - Access the app at localhost:3000