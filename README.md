# Contes - Login Page

# WHAT HAVE I LEARNED BY BUILDING THIS PROJECT?

-How to deploy express and react in the same application

- EJS view engine - libraries for rendering static pages
- ORM: Object-relational mapping
- JWT: JSON web Tokens
- bcrypt: library to hash passwords
- React routes
- How do cookies work
- Sending automatic e-mails using Twillio service

## THINGS I SHOULD FOCUS ON NEXT

improve: alert message for empty email and password fields
improve: container pop-up after being registered
improve: page error upon trying to use the validation link more them one time
improve: JWT token storage (now it is stored in the cookie which is not pretty safe)
improve: create a better pop for password and confirmed password alert
improve: remove the switch from <App /> and write a better code
improve: create validation to use the password redefinition just once
improve: create a better way to pass props on

implement: password strenght checker script
implement: Oauth authentication to provide a better service!
implement: Not Found 404 page
implement: template for the e-mail validation message
implement: body validation using joi

fix: when registerd, return to login page and then back to register it breaks

learn: good principles of header config
learn: how does Cross Site Request Forgery and Cross Site Scripting work and how to avoid them
learn: how to run nodeJs in a docker container


# Introduction

This is the first microservice created to compound my web application. Is a 
service to authenticate users and it offers the following features:

-Login: If the user is alredy subscribed, using the main page is possible to log in

-Register: To sign up the user fill the form with it`s email and password, then an e-mail is sent to him in order to confirm his e-mail and validate the user in the database

-Forgot: In case a user forgets its passord, using this link is possible to resend an e-mail containing a link in where the user can resert its password

As a studying case, this service has the front and the back end running in the
same service, as the other parts start to get done I will separte them

## Reflection

The purpose in building this projects was to get to know in deepth how the back and the front end can work together in the same application, in cases where the intention is to build a MVP it seems to be a very efficient choice for a fast deployment app intended to kick off a project

The central idea is to build a e-commerce and this first project is going to be the first users interaction with the app

## Tecnologies used:

DATABASE: PostgreSQL provided by a Heroku, this time I decided to not just use the postgresql driver but also to implement a ORM, exploring how this library can boost the developer delivery time by providing an abstract way to treat a db entity as an object and use it to perform a CRUD operation

BACK-END - NodeJs 16.16 using the following packages:
ExpressJs for the server along with some packages such as:
-Nodemon - for auto refresh after each change in the code in the development
-Dot-env - fot storaging the keys in the variable enviroment 
-PostgreSQL driver - DataBase used to store user`s data
-Sequelize - An ORM to help the developer in building up the database

bcrypt - every password stored in the database is encrypted adding an additional security layer once just the user has the password

JWT - every time a user log in the server provides him with a Token and the session keeps alive utilizaing this token as a form to validate the requests coming from the client side, in this case the sessions expires every 30 seconds to provide the chance to the user to see the feature running

FRONT-END: I used React to build the page using components, React is a very good option to build dynamica web sites, it provides tools, to control the routes, also for dynamically render components depending on the app state, in this project I could also experience the usage of basic hooks as well making post requests to ther server using the Axios package

I also opted to use Bootstrap in order to make the implementatio of responsiveness easier


## Project`s Preview

![contes-loginpage](https://user-images.githubusercontent.com/70711596/184801328-6f3108c3-9751-44b6-ad0b-48497d514c20.gif)


## Installation

Clone down this repository. You will need `node`, `npm` or `yarn` installed globally on your machine.

```bash
yarn
yarn start
```

or

```bash
npm install
npm run start
```

The server should start at:

`localhost:8080` 

## Deployed version

https://contes-loginpage.herokuapp.com/