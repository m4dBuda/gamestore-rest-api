# API-First-Store

To clone this API:

1. Get the HTTP URL from the clone button on the right top side of the page.
2. Open your terminal and navigate to the folder where you want to put the API into. 
   example: `cd C\:Users\MyPc\MyDocuments\My-API-Folder`
3. Now you can use the git clone command.
   example: `git clone https://gitlab.com/buda.dev/api-first-store`
4. Run `npm install`.
5. To start the API, run `npm start`
6. Dont forget to configure the `config/config.json` file to connect to ur database server.
7. Enjoy it! By default the API route will be `http://localhost:13700/`

## Structure and Installation

This API uses Clean Code Architecture, and it is defined as a restAPI that provides HTTP requests to a server, that handles JSON data and communicates directly to a database.

The data validation is done using `Validator` from NodeJS.
The tests are done using `Jest` and `Supertest`
The connection to the database and models are done using `Sequelize` and `Mysql2`
The password cryptographies, checkings and permissions are done using `Bcrypt` and `JsonWebToken`
The time-date data is translated using `Moment`

This API uses the following frameworks and libraries:

`Express`, `Sequelize`, `Jest`, `Supertest`, `Bcrypt`, `Moment`, `Morgan`, `Mysql2`, `Nodemon`, `Http`, `Validator`, `Axios`, `JWT`.

The database was created using `MySQL`.

You can try installing with `npm install`, but if it doesn't work you can try running the npm install command declaring the framework name, example: `npm i sequelize`

## Usage
This API was made for a Video-game Shop made in React.js, you can use it
to manage users, logins and password change, and also to store products,
put them into a cart, show the card with the products and related things.
Theres also a table for user privileges in the application, that you can explore and use.

The application database is on the `db_first_store` folder, you can import the .sql file to your database and name it as you want, just remember to also update your config.json file.

## Support
If you need any help or want to contribute feel free to throw me a message. =)

## Authors and acknowledgment
João Otávio C. de Carvalho

## License
Feel free to use it as you want!

## Project status
This project was used to teach students how to develop an restfulAPI for a web application!
