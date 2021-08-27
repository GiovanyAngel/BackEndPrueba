const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://gio-user:K4j3QCmaraw5fpYk@cluster0.c7lj6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true
}).then(() => {
    console.log("Sucessfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Errorr.. ', err);
    process.exit();
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({"message": "Server is running true! XD"});
});

let PORT = 8080

require('./app/routes/app.routes.js')(app);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});