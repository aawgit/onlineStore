# OpenShop

> version 0.1.1

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

- Install dependencies
  `~ npm install`

## Configure

- Set the environmental variables in the `.env` file placed on the project root. This is **required to use the application**!

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

## Build

Now, that all configuration and installation done, your ready to code! This boilerplate comes with various scripts that you can run from your terminal.

- `npm run build` - This will create a build from the CRA app and merges it with the Babel transpiled server code into the `~/myapp/build` directory.

### Scripts

Tasks that you can run from your terminal:

- `npm run start` - Launches the server in production environment. You must run `npm run build` before you can do this.
- `npm run start:dev` - Launches server directly from the source in development environment.
- `npm run build` - Cleans the build directory with `rimraf` and creates a new snapshot build from the current code.
- `npm run watch` - Executes a **nodemon** instance and **reac-script** hot-reload task. This allows you to change server and client code while both are watched.
- `npm run test:server` - Runs [Jest Framework](https://jestjs.io) in **watch** mode on the **server**.
- `npm run test:client` - Runs [Jest Framework](https://jestjs.io) in **watch** mode on the **client**.
- `npm run coverage:server` - Runs [Jest Framework](https://jestjs.io) with **--coverage** flag on the server. Executes all tests and creates a report.
- `run coverage:client` - Runs [Jest Framework](https://jestjs.io) with **--coverage** flag on the **client**. Executes all tests and creates a report.

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

## Deployment

Can be deployed on most popular cloud platforms. For configuration refer to the given documentation by your provider. Usually they will use `npm start` to run the deployed code so keep it as is. Additional description of this process is beyond the subject of this project.

## Contributing

Contributors are welcome in the development! :rocket:.

A few principles:

- Consider the actual code style when writing your own
- Provide test suite for your code
- Document your code (not verbose but enough to understand the logic)
- Make sure it integrates with the current state (eg: run both test tasks after you change)
- Feel free to create Issues / PRs but describe them properly

## License

This project is licensed under [ISC Software Licenses](https://www.isc.org/licenses/).

Copyright 2020 OpenShop v0.1.1

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
