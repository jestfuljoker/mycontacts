# My contact's API 📝

Project developed in NodeJs, using the express framework. In order to train basic concepts in backend, development of REST APIs, following RESTFUL standards.

## Technologies used

- [NodeJs](https://nodejs.org/en/docs/);
- [Express](https://expressjs.com/pt-br/);
- [Docker](https://docs.docker.com/get-started/);
- [Postgres](https://www.postgresql.org/docs/).

### How to run the api

**Create docker container for Postgres database**
```bash
  # Create database container
  docker run --name mycontacts-api-postgres -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres

  # Create .env file and populate with .env.example variables
  touch .env
```

**Create database entities**
```sql
-- Enter postgres environment container
-- and execute command the code bellow
-- or you can find it at at src/database/schema.sql

  CREATE DATABASE mycontacts;

  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

  CREATE TABLE IF NOT EXISTS categories (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE,
    phone VARCHAR,
    category_id UUID,
    FOREIGN KEY(category_id) REFERENCES categories(id)
  );

```

**Install dependencies and run the application**

```shell
#  Go to backend folder in terminal and install dependencies
yarn install

# After installing dependencies, you can run the api
yarn dev
```

### Some [notes](NOTES.md) taken during development

<p align="center">Developed with 💜 by <strong>Christofer Assis</strong></p>
