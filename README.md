# [7DayExpense Tracker](https://github.com/rahulrajdahal/7dayexpensetracker). Track your expenses.

## 🏗 Installation

### 1. clone the repository

```sh
https://github.com/rahulrajdahal/7dayexpensetracker.git
```

### 2. Install Dependencies

#### npm

```sh
cd 7dayexpensetracker && npm install
```

### 💾 Connect to Database

navigate to prisma/schema.prisma file and update for prisma db setup.

// schema.prisma

```sh
provider = "prisma-database-provider"
```

### 4. Update env

update the .env.example file to .env and append key value pairs.

### 5. Seed Data

Seed the default datas to the db.

```sh
npx prisma seed
```

### 6. Run development server

```sh
npm run dev
```

#### OR

### Run Production server

```sh
npm run start
```

## 🚀 Project Structure

Inside of project [7DayExpense Tracker](https://github.com/rahulrajdahal/7dayexpensetracker), you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── prisma/
│   ├── prisma.ts
│   └── seed.ts
├── app/
|   ├── page/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   ├── page.tsx
│   └── layout.tsx
├── components/
│   ├── index.ts
│   └── Component
|       └── Component.tsx
├── hooks/
│   └── index.ts
├── utils/
│   ├── helpers.ts
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command           | Action                                        |
| :---------------- | :-------------------------------------------- |
| `npm install`     | Installs dependencies.                        |
| `npm run dev`     | Starts local dev server at `localhost:3000`.  |
| `npm run build`   | Build your production site to `./next/`.      |
| `npm run start`   | Preview your build locally, before deploying. |
| `npm run lint`    | Check all linting errors.                     |
| `npx prisma seed` | Seed default data to database.                |
