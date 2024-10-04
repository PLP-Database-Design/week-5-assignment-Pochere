// Import our dependencies

const express = require('express')
const app = express()
const mysql = require('mysql2')
const dotenv = require('dotenv')

//Configure environment variables
dotenv.config();

// Create a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,  
    database: process.env.DB_NAME
 });

 // TEST THE CONNECTION

 db.connect((err) => {
    // connection is not successful
    if(err) {
        return console.log("Error connecting to the database", err)
    }
      // connection is successful
      console.log("Connected to mysql successfully as id:", db.threadId)
})

// Qstn 1: Retreive all patients
app.get('/get-patients', (req, res) => {
    const getPatients = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients"
    db.query(getPatients, (err, results) => {
        // If I have an error
        if(err) {
            return res.status(500).send("Failed to get patients")
        }
        // if i dont have an error
         res.status(200).send(results)
    })
})
//Qstn 2: display all providers
app.get('/get-providers', (req, res) => {
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers";
    db.query(getProviders, (err, results) => {
      if (err) {
        return res.status(500).send("Failed to get providers")
      }
      // if i dont have an error
      res.status(200).send(results)
    })
}) 
//Qstn 3: Filter patients by first name
app.get('/patients', (req, res) => {
    const patients = "SELECT first_name FROM patients";
    db.query(patients, (err, results) => {
      if (err) {
        return res.status(500).send("Failed to get patients")
      }
      // if i dont have an error
      res.status(200).send(results)
    })
}) 

//Qstn 4: Retreive all providers by their speciality
app.get('/providers', (req, res) => {
    const providers = "SELECT first_name FROM providers";
    db.query(providers, (err, results) => {
      if (err) {
        return res.status(500).send("Failed to get providers")
      }
      // if i dont have an error
      res.status(200).send(results)
    })
}) 


// declare the port and listen to the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})