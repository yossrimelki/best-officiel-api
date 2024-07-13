const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const http = require('http');
const dotenv = require("dotenv");
dotenv.config();




const bodyParser = require('body-parser');
const AuthRoute  = require('./routes/auth') 
const ShoesRoute  = require('./routes/shoes') 
const watchRoutes = require('./routes/watch')
const reclamationRoutes = require('./routes/reclamation')
const commandeRoute  = require('./routes/commande') 

mongoose.connect(process.env.database_uri);


const db = mongoose.connection;

db.on('error', (err) => {
   console.log(err);
});

db.once('open', () => {
   console.log('Database Connection Established!');
});

const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'))

const PORT = process.env.PORT || 3000;


app.use('/api', AuthRoute);
app.use('/api/shoes',ShoesRoute);
app.use('/api/watches', watchRoutes);
app.use('/api/reclamation',reclamationRoutes);
app.use('/api/commandes', commandeRoute);

const server = http.createServer(app);
server.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
