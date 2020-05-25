# OpenShop Boilerplate

> version 0.1.1

This project is a template for creating e-commerce website with user authentications and content management functionality.

- See it in action on the [demo site](https://openshop-amatyas001.herokuapp.com/login)

## Features:

- Token verification on request
- User email authentication
- Social login with Facebook
- Integrated RESTful API connected to MongoDB
- Server signed cloud media upload (Cloudiary)
- Optimized webpack bundling for development and production
- Hot-reloading environment with nodemon and react-scripts
- Test environment with Jest, Enzyme, Supertest
- Easy setup and deploy, push ready structure

## Prerequisites

To run the application check that you meet all the requirements:

- Latest Node installed
  - Check current version `node -v` _>=14.x.x_
  - CLI `: npm install -g n latest` _Or version that meets the above statement_
  - Binary: [Official NodeJs Download Site](https://nodejs.org/en/download/)
- MongoDB installed
  - [Instructions to intall MongoDB Community Edition on your platform](https://docs.mongodb.com/manual/administration/install-community/)
- Activated [Cloudinary account](https://cloudinary.com/users/register/free)
- Facebook API key for authentication
  - Get instructions on [Facebook Developers](https://developers.facebook.com) website

## Install

- Clone this repository
  `~ git clone https://github.com/amatyas001/openstore.git`

- Install dependencies
  `~/myapp/ npm install && cd client && npm install`

## Configure

- Set the environmental variables in the `.env` file placed under **`~/client/`**.

```dotenv
 REACT_APP_NAME         = 'My App'
 REACT_APP_VERSION      = 'v0.1.1'
 REACT_APP_FACEBOOK_ID  = xxxxxxxxxxxxxx123
```

- Set the environmental variables in the `.env` file placed under **root**.

```dotenv
APP_NAME                = 'My App'
APP_EMAIL               = 'support@myapp.xyz'
APP_URL                 = 'http://localhost:5000'
MAIL_USER               = 'me@service.xyz'
MAIL_PASSWORD           = 'mydummypassword'
FACEBOOK_CLIENT_ID      = xxxxxxxxxxxxxx123
FACEBOOK_CLIENT_SECRET  = xxxxxxxxxxxxxxxxxxxxxxxxxxxxa693
CLOUDINARY_API_SECRET   = xxxxxxxxxxxxxxxxxxxxxxxctYM
CLOUDINARY_API_KEY      = xxxxxxxxxxx7191
CLOUDINARY_CLOUD_NAME   = mycloudinaryname
CLOUDINARY_URL          = cloudinary://xxxxxxxxxxx7191:xxxxxxxxxxxxxxxxxxxxxxxctYM@mycloudinaryname
MONGODB_URI             = 'mongodb://127.0.0.1:27017/mydatabase'
HTTPS                   = false
JWT_SECRET              = 'mydummysecret'
```

## Development

- Run `npm run watch` and you ready to go! This will take care of the building and server starting. Both client and server will recompile codebase after changes.

### Deploy

When you have configured your database and set the environmentals on the desired platform, simply push the codebase to the host and run the `npm start` process if required. Your app can be deployed on most of the cloud platforms. Additional description of this process is beyond the subject of this project. For details on how to configure your host to run Node application refer to the given documentation by your provider.

### Scripts

There are a lot of helper scipts in the `package.json` file but to run basic tasks you only need a few of them:

- `npm run start` - Launches the application in production environment. _(served from `~/myapp/dist`)_
- `npm run build` - Builds the client and server with webpack into the project root.
- `npm run watch` - Runs both client and server in parellel watch mode _(served from `~/myapp/build`)_
- `npm run test` - Runs [Jest](https://jestjs.io) testing framework.
- `npm run coverage ~:client | ~:server` - Runs Jest's default [Istanbul](https://istanbul.js.org/docs/tutorials/jest/) coverage reporter _(eg: `npm run coverage:server`)_.

## Application

The main App module is wrapped in a global Context which provides the current state of whole application and passes getters, setters to the consumers. Details can be found in the module documentation _(~/myapp/client/src/Context.js)_

Client side routing is provided by `react-router-dom`. A few general practices if you don't know the library:

- To push a route to a new state use the `<Link to="/new_route">` component, which basically an anchor element _(using history object under the hood)_.
- Redirect pages by rendering the `<Redirect to="/redirect_route">` component _(This is usually depends on component state and a conditional rendering in the `render()` method)_.
- Assign components to routes in the `~/myapp/client/src/Routes.js` file which holds the ovelall routing configuration.

You can read more about the details in the [Documentation](https://reacttraining.com/react-router/web) of `react-router-dom`.

Endpoint communication is provided by the popular and easy-to-use [axios](https://github.com/axios/axios) service which handles outbound requests. All API routing is set in the `~/myapp/client/src/constants.js` for global access.

Application structure:

```
root
| .env
| .gitignore
| package.json
| webpack.development.js
| webpack.production.js
├───[build]
├───[dist]
├───[client]
|   ├───[components]
|   ├───[routes]
|   | .env
|   | package.json
|   | constants.js
|   | Context.js
|   | index.js
|   | Routes.js
├───[server]
|   ├───[models]
|   ├───[routes]
|   ├───[utils]
|   | server.js
```

## Test

The application uses [Jest](https://jestjs.io) as unit testing framework extended by [Enzyme](https://enzymejs.github.io/enzyme/) library. Specifitation tests follow `*.spec.js` naming convention. Server testing uses the same framework besides [Supertest](https://github.com/visionmedia/supertest) endpoint testing library.

## Versioning

The keep [Create React App](https://github.com/facebook/create-react-app) intact you must use the exact verisons of `babel` and `jest` and `webpack` in the root `package.json` as the CRA's `react-scripts` uses. If there's a version mismatch, build should fail on the application. If you want to use other versions because of your special needs you can still `eject` CRA but when you do this, you could upgrade `react-scripts` anymore! Keeping up with the upgrades of `react-scripts` and upgrading the packages manually should be enough for most cases. _If you have an error related to this, you can check the versions with `npm ls <moduleName>`_

## Contributing

There are a lot of improvements needed in this project. If you have an idea or want to help achieve the existings feel free to join in.

Contributors are welcome in the development! :rocket:.

- We need your voice
  > Open issues and pull request freely
- Stuff can break
  > Provide test suite for your code with possible edge cases
- Your write code for humans not compilers
  > Document your code if needed (not verbose but enough to understand the logic)

## License

This project is licensed under [ISC Software Licenses](https://www.isc.org/licenses/).

Copyright 2020 OpenShop v0.1.1

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
