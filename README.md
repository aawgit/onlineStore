# OpenShop Boilerplate

> version 0.1.1

This project is a template for creating e-commerce website with user authentications and content management functionality.

- See it in action on the [demo site](https://openshop-amatyas001.herokuapp.com/login)

## Features:

- Token verification
- Social login
- Integrated RESTful API
- Cloud upload

## Prerequisites

To run the application check that you meet all the requirements:

- Latest Node installed
  - Check current version `node -v` _>=13.x.x_
  - CLI `: npm install -g n latest` _Or version that meets the above statement_
  - Binary: [Official NodeJs Download Site](https://nodejs.org/en/download/)
- MongoDB installed
  - [Instructions to intall MongoDB Community Edition on your platform](https://docs.mongodb.com/manual/administration/install-community/)
- Activated [Cloudinary account](https://cloudinary.com/users/register/free) with **upload preset configuration**
  - [How can I add upload-options when uploading via the Media-Library?](https://support.cloudinary.com/hc/en-us/articles/208097215-How-can-I-add-upload-options-when-uploading-via-the-Media-Library-)
- Facebook API key for authentication
  - Get instructions on the [Facebook Developers](https://developers.facebook.com) website

## Install

- Clone this repository
  `~ git clone https://github.com/amatyas001/openstore.git`

- Install dependencies
  `~/myapp/ cd client && npm install && cd ../server && npm intall`

## Configure

- Set the environmental variables in the `.env` file placed under **`~/client/`**

```
 REACT_APP_NAME         = 'My App'
 REACT_APP_VERSION      = 'v0.1.1'
 REACT_APP_FACEBOOK_ID  = xxxxxxxxxxxxxx123
```

- Set the environmental variables in the `.env` file placed under **`~/server/`**.

```
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

_Note: If you deploy your app, your should only set the server variables to the environment but make sure before the build that your client `.env` is set properly._

## Build

> Development

- Run `npm run watch` from the **~/server/** directory and you ready to go! This will take care of the building and server starting. You can modify both server and client code and

> Production (This assumes you have set up your environment on the provider)

- Refer to the [Deploy](https://github.com/amatyas001/openshop#deploy) section

### Scripts

There are multiple scripts under each module, however some of them only helpers to shorten main scripts and not listed here. Usually you manage tasks from the **server directory**, but it's possible to run command only for the client. This is helpful when you want to test your client code or get the test coverage.

#### Server

> _Run from the `~/server/`directory_

- `npm run start` - Launches the server in production environment.
- `npm run build` - Merges the client and server builds to prepare deployment.
- `npm run watch` - Executes a **nodemon** instance and **reac-script** watcher. This allows you to change server and client code while both are watched and reloaded when change detected.
- `npm run test` - Runs [Jest Framework](https://jestjs.io) in **watch** mode on the server. If you need configurations you can freely use `npx jest [options]` format as well.
- `npm run coverage` - Runs [Jest Framework](https://jestjs.io) with **--coverage** flag on the server. Executes all tests and creates a report.

**_Important!_** - Use the `deploy-master` branch for deployment, which contains the output of `npm run build`

#### Client

> _Run from the `~/client/`directory_

- `npm run start` - Same as any other Create React App `npm start`
- `npm run build` - Create a production bundle from client module.
- `npm run test` - Runs [Jest Framework](https://jestjs.io) in **watch** mode.
- `npm run coverage` - Runs [Jest Framework](https://jestjs.io) with **--coverage** flag. Executes all tests and creates a report.

## Routing

### Client

Application comes with `react-router-dom` which handles the internal routing. **Routes module** handles the changes and assigns module to routes.

- Pushing a route to the router using the `<Link to="/new_route">` component.
- Redirect pages by render the `<Redirect to="/redirect_route">` to redirect the component _(This is usually depends on component state and a conditional rendering in the `render()` method)_.
- Assign components to routes in the `~/myapp/client/src/Routes.js` file.

Read more in the [Documentation](https://reacttraining.com/react-router/web) of `react-router-dom`.

### Server

By default all routing is set in the `~/myapp/client/src/constants.js`. If you change the values or extend them, make sure you **update the request handlers on the server** in `~/myapp/server/src/server.js`.

## Test

The application uses [Jest](https://jestjs.io) as its unit testing framework extended by [Enzyme](https://enzymejs.github.io/enzyme/) library. Specifitation tests follow `*.spec.js` naming convention. While developing always remember to keep your code **clean** and **isolated** to test them with ease.

## Deploy

This process assumes that you have configured your platform, database and set the environmentals. Next you can see the general process of deploying to a prepared host:

- Make a **new git branch** (eg: `git branch deploy-master && git checkout deploy-master`)
- Edit the static paths in the `server.js`: change `../build` to `build` _(In development mode client and server are separated)_
- Modify the **starting script** in `package.json` to `"start": "node ./build/server.js"`
- Build your project running `npm run build` in the **server** directory _(This will create a production ready build from the client app and transpiles the server code with babel to the `build` directory)_
- Delete everything except the `build` directory and `package.json` - **_Double check that you are in a deploy-branch: `git status`_**
- Commit to the **branch** you just created
- Push the deploy-branch to the provider (you can use CI/CD and everything you prefer)

After these steps, your app can be deployed on most of the cloud platforms _(tested only on Heroku)_. For configuration refer to the given documentation by your provider. Usually they will use `npm start` to run the deployed code so keep it as is. Make sure that the _deploy-branch_ `package.json` is in your project root. Additional description of this process is beyond the subject of this project.

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
