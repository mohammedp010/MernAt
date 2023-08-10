<h1 align="center">
🌐 MernAt
</h1>
<p align="center">
MongoDB, Expressjs, React(ChakraUI), Nodejs
</p>

<!-- <p align="center">
   <a href="https://github.com/amazingandyyy/mern/blob/master/LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-green.svg" />
   </a>
   <a href="https://circleci.com/gh/amazingandyyy/mern">
      <img src="https://circleci.com/gh/amazingandyyy/mern.svg?style=svg" />
   </a>
</p> -->

## Features

- User Registration: Users can create an account by providing their basic information and securely authenticate themselves for future logins.
- One-to-One Chat: Registered users can initiate private conversations with other registered users by searching for their username and starting a chat.
- Group Chat: Users can join or create multiple chat groups and engage in discussions with other participants in real-time.
- Real-time Messaging: The application leverages websockets to enable instant message delivery, ensuring a smooth and seamless chat experience.


> MERN is a fullstack implementation in MongoDB, Expressjs, React/Redux, Nodejs.


MERN stack is the idea of using Javascript/Node for fullstack web development.

## clone or download
```terminal
$ git clone https://github.com/mohammedp010/MernAt.git
$ yarn # or npm i
```

## project structure
```terminal
LICENSE
package.json
server/
   package.json
   .env (to create .env, check [prepare your secret session])
client/
   package.json
...
```

# Usage (run fullstack app on your machine)

## Prerequisites
- [Node](https://nodejs.org/en/download/) ^10.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3000)
```terminal
$ cd client          // go to client folder
$ yarn # or npm i    // npm install packages
$ npm run dev        // run it locally

// deployment for client app
$ npm run build // this will compile the react code using webpack and generate a folder called docs in the root level
$ npm run start // this will run the files in docs, this behavior is exactly the same how gh-pages will run your static site
```

## Server-side usage(PORT: 8000)

### Prepare your secret

run the script at the first level:

(You need to add a JWT_SECRET in .env to connect to MongoDB)

```terminal
// in the root level
$ cd server
$ echo "JWT_SECRET=YOUR_JWT_SECRET" >> src/.env
```

### Start

```terminal
$ cd server   // go to server folder
$ npm i       // npm install packages
$ npm run dev // run it locally
$ npm run build // this will build the server code to es5 js codes and generate a dist file
```


# Dependencies(tech-stacks)
Client-side | Server-side
--- | ---
axios: ^1.2.2 | bcryptjs: ^2.4.3
react: ^18.2.0 | dotenv: ^16.0.3
react-dom: ^18.2.0 | express: ^4.18.2
react-lottie: ^1.2.3 | jsonwebtoken: ^9.0.0
react-router-dom: ^5.3.4 | mongoose: ^6.8.3
frane-motion: ^8.4.5 | nodemon: ^2.0.20
socket.io: ^4.5.4 | socket.io-client: "^4.5.4"

# Screenshots of this project

User visit Chats Home page
![User visit public and Home page](https://drive.google.com/file/d/1N-OWEY9n62acfinB79HRf5xwFKrb-dzX/view)

User can sign in or sign up
![User can sign in or sign up](https://drive.google.com/file/d/1NKAi0Oek11ybJWN5XHgUV2iiMXNZOH9u/view)


## Standard

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## BUGs or comments

[Create new Issues](https://github.com/mohammedp010/MernAt/issues) (preferred)

Email Me: mohammedpatrawala1@gmail.com

## Author
Mohammed Patrawala
