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
  - Run 
    ```
    $ npm install 
    $ cd client && npm install
    ```
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
    CLOUDINARY_CLOUD_NAME = <cloudinary cloud name>
    
    #Database server connection URI. If you are using mLab, this needs to be created at https://mlab.com/, and would look like the following:
    MONGODB_URI = 'mongodb://<user_name>:<password>@xxxxx.mlab.com:xxxxx/<db_name>'

  - Run ``$ npm run dev`` to start both front end and back end on ports 5000 and 3000 respectively
  - Run ``$ npm run start`` to start the back end express server on port 5000

## Available Routes

### User Authentication

- Login with Facebook

```
Method: post
Type: public
Route:
/api/auth/facebook/login
```

- Register new user with email

```
Method: post
Type: public
Route:
/api/auth/register
```

- Login user with email

```
Method: post
Type: public
Route:
/api/auth/login
```

- Verify email address

```
Method: get
Type: public
Route:
/api/auth/verify/<your token>
```

- Get profile information

```
Method: get
Type: private
Route:
/api/auth/me
```

### User Information

- Get all users

```
Method: get
Type: public
Route:
/api/users/
```

- Get a specific user with user ID

```
Method: get
Type: public
Route:
/api/users/<user ID>
```

### Items

- Create new item

```
Method: post
Type: private
Route:
/api/items/
```

- Get single item with item ID

```
Method: get
Type: public
Route:
/api/items/<item ID>
```

- Get all available items

```
Method: get
Type: public
Route:
/api/items/
```

- Delete an item with item ID

```
Method: delete
Type: private
Route:
/api/items/<item ID>
```

- Update an item with item ID

```
Method: put
Type: private
Route:
/api/items/<item ID>
```

## Running the tests

Currently No tests are available.

## Deployment
To deploy on Heroku, create an account and set up environment variables. Then run ``$ git push heroku master``
[Preview](https://frozen-lake-54898.herokuapp.com/)

## Contributing

Please create an issue and start working a feature/ bug you prefer :rocket:.

## License

This project is licensed under ISC.

