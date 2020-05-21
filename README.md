# React / Node E-Commerce Boilerplate

This project is a template for creating e-commerce website with user authenticationa and content management functionality.

## Features:

- Token authenticated user management
- Registration through Facebook API
- Standard registration with e-mail and verification
- Content CRUD operations
- Cloud storage for uploaded content

## Prerequisites

To run the application properly, verify that you meet all the requirements below.

- Latest Node installed
  - CLI `: npm install -g n latest`
  - Binary: [Official NodeJs Download Site](https://nodejs.org/en/download/)
- MongoDB installed
  - [Instructions to intall MongoDB Community Edition on your platform](https://docs.mongodb.com/manual/administration/install-community/)
- Activated [Cloudinary account](https://cloudinary.com/users/register/free) with an **unsigned preset** configured
  - [How can I add upload-options when uploading via the Media-Library?](https://support.cloudinary.com/hc/en-us/articles/208097215-How-can-I-add-upload-options-when-uploading-via-the-Media-Library-)
- Facebook API key for the authentication
  - Get instructions on the [Facebook Developers](https://developers.facebook.com) website

## Install

By installing the application the package manager installs the required dependencies automatically. **Before you do any changes remember to create a build first (see below)**!

- Clone this repository
  `~ git clone https://github.com/aawgit/onlineStore.git`

- Install dependencies for both Server and Client
  `~ npm install && cd client && npm install`

## Configure

- Set the environmental variables in the `.env` file placed on the project root. This is **required to use the application**!

```
APP_NAME                = 'My App'
APP_EMAIL               = 'support@myapp.xyz'
APP_URL                 = 'http://localhost:5000'
MAIL_USER               = 'me@service.xyz'
MAIL_PASSWORD           = 'mydummypassword'
FACEBOOK_CLIENT_ID      = 1343346045860132
FACEBOOK_CLIENT_SECRET  = 7c49c01a740912aba449c7e59927a693
CLOUDINARY_API_SECRET   = xxxxxxxxxxxxxxxxxxxxxxxctYM
CLOUDINARY_API_KEY      = xxxxxxxxxxx7191
CLOUDINARY_CLOUD_NAME   = mycloudinaryname
CLOUDINARY_URL          = cloudinary://xxxxxxxxxxx7191:xxxxxxxxxxxxxxxxxxxxxxxctYM@mycloudinaryname
MONGODB_URI = 'mongodb://127.0.0.1:27017/mydatabase'
HTTPS       = false
JWT_SECRET  = 'mydummysecret'
```

## Build

Now, that all configuration and installation done, your ready to code! This boilerplate comes with various scripts that you can run from your terminal. **Recommended to run `npm run watch:dev` in the server directory. It takes care of the building process and runs both client and server in hot reload mode.**.

### Server scripts

**This scripts only available in the server directory!**

- `~/myapp/server/ npm start` - Builds and runs the server in **production environment** _Note: keep `start` script in production because most cloud services use this to access your server_
- `~/myapp/server/ npm run build` - Cleans the build directory and creates a new snapshot build from the current code. The `build`process transpiles into common javascript by Babel. This is a shorthand for `clean` and `transpile` scripts.
- `~/myapp/server/ npm run server` - Runs the default **Node Server**
- `~/myapp/server/ npm run client` - Runs the client **watcher** script
- `~/myapp/server/ npm run dev` - Shorthand for `build` & `server` in **development encironment**
- `~/myapp/server/ npm run prod` - Shorthand for `build` & `server` in **production environment**
- `~/myapp/server/ npm run watch` - Executes a **nodemon** instance on your **build directory**
- `~/myapp/server/ npm run watch:dev` - Parellel executing of `watch` & `client`. This way you can hot reload both front- and backend. _(Note: changes in the server entry point (eg: ~/server/src/server.js) does not trigger a reload and you must restart the script to ahve changes take effect)_
- `~/myapp/server/ npm run test` - Runs [Jest Framework](https://jestjs.io) in **watch** mode
- `~/myapp/server/ npm run cov` - Runs [Jest Framework](https://jestjs.io) with **--coverage** flag. Executes all tests and creates a report.
- `~/myapp/server/ npm run transpile` - Runs [Babel](https://babeljs.io) transpiler to get vanilla code in your build directory
- `~/myapp/server/ npm run clean` - Executes [RimRaf](https://github.com/isaacs/rimraf) on the build directory.

### Client scripts

**This scripts only available from the client directory**

- `~/myapp/client/ npm start` - Executes `react-scripts` in **watch** mode
- `~/myapp/client/ npm run build` - Builds the appliction in **production mode** into the **build** directory.
- `~/myapp/client/ npm run test` - Runs [Jest Framework](https://jestjs.io) in **watch** mode
- `~/myapp/client/ npm run cov` - Runs [Jest Framework](https://jestjs.io) with **--coverage** flag. Executes all tests and creates a report.

## Routing

### Client Routing

Application comes with `react-router-dom` which handles the internal routing. **Routes module** handles the changes and assigns module to routes.

- Pushing a route to the router using the `<Link to="/new_route">` component.
- Redirect pages by render the `<Redirect to="/redirect_route">` to redirect the component _(This is usually depends on component state and a conditional rendering in the `render()` method)_.
- Assign components to routes in the `~/myapp/client/src/Routes.js` file.

Read more in the [Documentation](https://reacttraining.com/react-router/web) of `react-router-dom`.

### Server Routing

By default all routing is set in the `~/myapp/client/src/constants.js`. If you change the values or extend them, make sure you **update the request handlers on the server** in `~/myapp/server/src/server.js`.

## Test

The application uses [Jest](https://jestjs.io) as its unit testing framework extended by [Enzyme](https://enzymejs.github.io/enzyme/) library. Specifitation tests follow `*.spec.js` naming convention. While developing always remember to keep your code **clean** and **isolated** to test them with ease.

## Deployment

Can be deployed on most popular cloud platforms (eg: Heroku, AWS, GCP...etc.).

## Contributing

Contributors are welcome in the development! :rocket:.

- Create an [Issue](https://github.com/aawgit/onlineStore/issues/new)
- Describe the subject of your work
- Code
- Create _PR_ to merge your work

## License

This project is licensed under [ISC Software Licenses](https://www.isc.org/licenses/).
