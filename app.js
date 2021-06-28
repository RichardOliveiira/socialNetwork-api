const express = require ('express');
const app = express();
const cors = require('cors')
const { notFoundHandler, errorHandler } = require('./shared/errosHandler');
const firebase = require("firebase/app");
const firebaseConfig = require('./config/firebase.json')
firebase.initializeApp(firebaseConfig);

//import das routes
const users = require('./routes/users');


//links rotas
app.use(express.json())
app.use(cors())
app.use('/users', users);
app.use(notFoundHandler);
app.use(errorHandler);



module.exports = app;
