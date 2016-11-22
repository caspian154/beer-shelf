A Beer shelf app for keeping track of the beers in the basement and reviews of what you've tasted in the past.

### Steps to run locally
1. Clone this repository
    * `git clone git@github.com:caspian154/beer-shelf.git`
2. `cd` into the repository folder.
3. Download and install [NPM](https://nodejs.org/en/download/)
4. Install nodemon using `npm install -g nodemon`
5. Install the remaining dependencies with `npm install`.
6. Run the app by executing the `nodemon` command.
7. In order to do anything in the app, you'll need to create a SQL database, I recommend MySQL.
	* The database connection settings are in `database.js`.
	* Create scripts for the SQL database are in `/database`.
