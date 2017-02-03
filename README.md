A Beer shelf app for keeping track of the beers in the basement and reviews of what you've tasted in the past.

## Steps to run locally
1. Clone this repository
    * `git clone git@github.com:caspian154/beer-shelf.git`
2. `cd` into the repository folder.
3. Download and install [NPM](https://nodejs.org/en/download/)
4. Install nodemon using `npm install -g nodemon`
5. Install the remaining dependencies with `npm install`.
6. Run the app by executing the `nodemon -e js --ignore public` command.
7. The app will set up a sqlite3 database and seed some initial data.
    * The database connection settings are in `database/knexfile.js`.

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