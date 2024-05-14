# Backend for Moventure
This is the backend service for Moventure, a travel technology platform. It is built using Node.js and Express and communicates with a MongoDB database.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing
1. **Install dependencies**
   Navigate to the backend directory and install the project dependencies.
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Customize the [env](/env/) code or change it as needed. Copy [example.json](/env/example.json) and paste the content in three files: development.json, production.json and test.json: `cat ./env/example.json | tee ./env/development.json ./env/production.json ./env/test.json > /dev/null`. 

   For the nodemailer we need app password. you can get one via gmail account. Refer to [this](https://medium.com/@y.mehnati_49486/how-to-send-an-email-from-your-gmail-account-with-nodemailer-837bf09a7628).

### Running the application
To start the server, run:
```bash
npm run start
```
If using Nodemon for development, you can run:
```bash
npm run dev
```

## API Documentation
- URL
- Method
- URL Params
- Data Params
- Success Response
- Error Response
- Sample Call

## Deployment
Add additional notes about how to deploy this on a live system. Include any scripts, configurations, or necessary steps.

## Built With
- [Node.js](https://nodejs.org/) - The runtime server
- [Express](https://expressjs.com/) - Web framework for Node.js
- [MongoDB](https://www.mongodb.com/) - Document-oriented NoSQL database

