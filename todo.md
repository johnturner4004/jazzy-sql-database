- [*]Fork & clone the starter code
- [*]Install dependencies (`npm install`)
- [*]Start the app (`npm start`)
- [*]Check out the demo app at http://localhost:5000
- [*]Look through the code that has been provided to you!
- [*] Create a new database called `jazzy_sql` using Postico.
- [*] Write the SQL to create both of the tables (Note: Make sure to use the table names show.)
- [*] Write INSERT statements to add the sample data provided in the `server.js` file. 
- [*] Create the tables and insert the test data using Postico.
- [*] Add the SQL to the `database.sql` file. This file will help others interested in this project, get it setup correctly if they pick it up from GitHub.
- [*] Install `pg` and setup your `pool` to connect to the database.
- [*] Update the `\artist` GET route to get data from the database. Sort the data by birthdate, youngest to oldest.
- [*] Update the `\artist` POST route to store data in the database. 
- [*] Update the `\song` GET route to get data from the database. Sort the data by title.
- [*] Update the `\song` POST route to store data in the database.  

## Stretch

- [ ] Move the `pool` configuration out of `server.js` and into a `pool.js` module file.
- [ ] Move the `\artist` routes to an artist router file. 
- [ ] Move the `\song` routes to a song router file.
