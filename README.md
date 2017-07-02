A Beer shelf app for keeping track of the beers in the basement and reviews of what you've tasted in the past.

## Steps to run locally
1. Clone this repository
    * `git clone git@github.com:caspian154/beer-shelf.git`
1. `cd` into the repository folder.
1. Download and install [NPM](https://nodejs.org/en/download/)
1. Install Dependencies
    ~~~
    npm install -g nodemon
    npm install -g webpack
    npm install
    ~~~
1. Manage database connection settings in `database/knexfile.js` -- on first run a database will be created and seeded with data if you don't have one.
    * Default username/password: admin@beershelf.com/admin,
1. Run the app
    ~~~
    # build the angular app
    npm run build 

    # serve the nodejs and site through express: http://localhost:3000
    npm run serve

    # build the angular app and then serve it
    npm run start
    ~~~

## 

## Database Migrations

Database migrations are handled by knex as mentioned in the previous step. I want to mention a couple of things to help me (and others if there is anyone out there) creating new migrations. Because the server runs from the root and I like having the knex file in the `database/` subdirectory things are little wierd to make that work nicely with the node server and running migrations from the console. How I got it to work was to create another environment for the console: `cli`.

Create a new migration from `./database/` with the command
~~~
knex migrate:make [name] --env cli
~~~

Create a new seed from `./database/` with the command
~~~
knex seed:make [name] --env cli
~~~
