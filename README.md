# Setup project

Open the terminal in the repository location

Install packages:

`npm install`

`npm run start`

This loads react and json-server at the same time.

# Code Style Guide

- Use Typescript
- Use TailwindCSS

### File Naming

- PascalCase for component and Pages folders.
- camelCase for custom hooks and other non-component files

### Folder structure

- src/

  - components

  - hooks

  - pages

  - services

  - store

  - types

  - utils

  index.tsx

  App.tsx

# Todo

- [ ] Add validations to push and commit (husky)

- [x] Add api route to env file

- [x] Add image optimization according to documentation

- [x] Image onerror handling

- [x] Persisted state in localstorage

- [ ] useCallback and useMemo

- [ ] Unit tests

# If this app grows it needs

- [ ] Adding metatags for SEO translated for each country

- [ ] Including i18n for handling translations

- [ ] react-router if it has more routes

- [ ] connecting the error boundary to some tool for logging errors

- [ ] e2e tests

- [ ] Including tracking
