# Auth - API

## Running the project locally for development

Install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run start:dev
```

To run the production server:

```bash
npm run build
```

```bash
npm run start:prod
```

> Open [http://localhost:3000](http://localhost:3000) with your browser to see the result

## Migrations

### Production: To generate / run / revert a migration, make build first

```bash
npm run build
```

### Generate a migration from existing table schema <br />

Automatic migration generation creates a new migration file and writes all sql queries that must be executed to update the database

Generate migration

```bash
TableName=<name> npm run migration:generate
```

### Run migrations <br />

To execute all pending migrations use following command:

To run a migration

```bash
npm run migration:run
```

### Revert migrations <br />

To revert the most recently executed migration use the following command:

To revert a migration

```bash
npm run migration:revert
```

### Show migrations <br />

To show all migrations and whether they've been run or not use following command:

To show migrations

```bash
npm run migration:show
```

## 📘 DB Design

This project uses TypeORM to manage associations between entities in a relational database. Below is an overview of the entities and their relationships, with TypeScript code examples for each.
![DB Design Image](/assets/db-design.png)

### 🗂 Entity Relationships:

1. Organisation has a one-to-many relationship with Departments.
2. Organisation has a one-to-one relationship with Admins.
3. Departments have a one-to-many self-referencing relationship with other Departments (a parent department can have multiple child departments).
4. Departments have a one-to-many relationship with Users.
5. Users have a one-to-one relationship with Students.
6. Users have a one-to-one relationship with Admins.

### In summary:

Each Organisation can have multiple Departments and a single Admin.
Each Department can have multiple child departments, multiple students, and multiple admins.
Users serves as a polymorphic association for both Students and Admins.
