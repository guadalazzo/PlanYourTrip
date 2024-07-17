## Plan your trip

The app is connected to the localhost json-server it needs a be running local to work

[https://plantrip-web.netlify.app/](https://plantrip-web.netlify.app/)

A product searcher, where users will select a Country, City and Date, and then a list of products will be shown based on those search options.

## Table of Contents

- [Mobile view](#mobile-view)
- [Desktop view](#desktop)
- [Setup project](#setup-project)
- [Tests](#tests)
- [Code Style Guide](#code-style-guide)
  - [File Naming](#file-naming)
  - [Folder structure](#folder-structure)
- [Performance test](#performance-test)
- [Todo](#todo)
- [If this app grows it needs](#if-this-app-grows-it-needs)

### Mobile view:

![Main screen](public/initialscreen.png 'Home screen')

![Main screen](public/products.png 'Screen filtered screen')

### Dektop

![Main screen](public/desktop-initial.png 'Home screen')

![Main screen](public/desktop-filtered.png 'Screen filtered screen')

City filter only enabled when a country is selected, this filter alignments change from mobile to desktop

Added functionality to reset filters, since I'm persisting the state in localStorage

Date filter only enabled when city is selected, end of the month filter has a separation

Product cards only shown when all filters are selected

if discount is present previous price and current price are shown

when a new country is chosen the product list is removed

# Setup project

Open the terminal in the repository location

Install packages:

`npm install`

`npm run start`

## TESTS

`npm run test`

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

  - '**tests**'

  - utils

  index.tsx

  App.tsx

# Performance test

Test runned in https://plantrip-web.netlify.app/ incognito

### Desktop

![Lighthouse](public/perf-desk.png 'Lighthouse')

with filters open:
![Lighthouse](public//desktop-performance.png 'Lighthouse')

### Mobile

![Lighthouse](public/perf-mob.png 'Lighthouse')

![Lighthouse](public/mobile-performance.png 'Lighthouse')

# Todo

- [x] Add lint and test before push (husky)

- [x] Add api route to env file

- [x] Add image optimization according to documentation

- [x] Image onerror handling

- [x] Persisted state in localstorage

- [x] useCallback and useMemo

- [x] Unit tests

- [x] Accesibility

- [x] SEO semantics and metatags

- [x] Preloaded font

# If this app grows it needs:

- [ ] Connect to a real API URL

- [ ] Adding metatags opengraph for SEO translated for each country

- [ ] Including i18n for handling translations

- [ ] react-router if it has more routes

- [ ] Connecting the error boundary to some tool for logging errors

- [ ] e2e tests

- [ ] Including tracking

- [ ] Handling production/dev secret keys for example for API urls.

- [ ] More test coverage

- [ ] Configure pipeline for CI/CD
