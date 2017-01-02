A Beer shelf app for keeping track of the beers in the basement and reviews of what you've tasted in the past.

### Steps to run locally
1. Clone this repository
    * `git clone git@github.com:caspian154/beer-shelf.git`
2. `cd` into the repository folder.
3. Download and install [NPM](https://nodejs.org/en/download/)
4. Install nodemon using `npm install -g nodemon`
5. Install the remaining dependencies with `npm install`.
6. Run the app by executing the `nodemon -e js --ignore public` command.
7. The app will set up a sqlite3 database and seed some initial data.
	* The database connection settings are in `database/knexfile.js`.
