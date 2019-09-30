# A CRUD API and Front end for a online store (with MERN Stack)
This project can be used as a boiler plate for building a MongoDB-Express-React-Node stack application.
## Features:
  - CRUD operations for items, subject to user authorization
  - User registration and verification by email
  - User authentication with Facebook, Oauth
  - Uploading an image of the item

## Getting Started
### Prerequisites

 - NodeJS, NPM (https://www.npmjs.com/get-npm)
 - A MongoDB server, local or remote. Example: mLab (https://mlab.com/)
 - A cloudinary account (https://cloudinary.com/)
 - A Heroku free tier plan - optional

### Installing

  - Clone the repo and check out the code
  - Run ``$ npm install`` 
  - Set following environment variables in a .env file in the root directory
    ``` 
    #jwt secret
    JWT_SECRET = <some string> ex: 'myJWTSecret'
    
    #fb app credentials, needs to be created at https://developers.facebook.com/apps
    CLIENT_ID = <Facebook app client ID for your app> 
    CLIENT_SECRET = <Facebook app client secret for your app>
    
    #email credentials
    MAIL_USER = <e-mail address, from which you will be sending the account verification emails to new users> ex:"support@yourstoreapp.com"
    MAIL_PASSWORD = <e-mail password for the above account> 
    
    #cloudinary credentials, needs to be created at https://cloudinary.com/
    CLOUDINARY_API_SECRET = <cloudinary API secret for your app>
    CLOUDINARY_API_KEY =  <cloudinary API key for your app>
    CLOUDINARY_CLOUD_NAME = " <cloudinary cloud name>
    
    #Database server connection URI. If you are using mLab, this needs to be created at https://mlab.com/, and would look like the following:
    MONGODB_URI = 'mongodb://<user_name>:<password>@xxxxx.mlab.com:xxxxx/<db_name>'

    #Sentry url need to be created at https://sentry.io/welcome/, and would look like the following:
    SENTRY_DSN = https://<code>@sentry.io/<code> 
  - Run ``$ npm run dev`` to start both front end and back end on ports 5000 and 3000 respectively
  - Run ``$ npm run start`` to start the back end express server on port 5000

## Running the tests

Currently No tests are available.

## Deployment
To deploy on Heroku, create an account and set up environment variables. Then run ``$ git push heroku master``
[Preview](https://frozen-lake-54898.herokuapp.com/)

## Contributing

Please create an issue and start working a feature/ bug you prefer :rocket:.

## License

This project is licensed under ISC.

