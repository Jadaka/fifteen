# Fifteen

A fifteen puzzle game built for the browser.

## Server Development (api workspace)

```bash
# change directories into the workspace
cd api

# create the database by running scripts/schema.sql
mysql -u [user] -p[password] < scripts/schema.sql

# install dependencies
yarn

# start dev server
yarn start

# run tests
yarn test

# create production build
yarn build
```

## Client Development (web workspace)

```bash
# change directories into the workspace
cd web

# install dependencies
yarn

# start dev server
yarn start

# run tests
yarn test

# create production build
yarn build
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
