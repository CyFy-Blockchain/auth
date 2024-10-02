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
