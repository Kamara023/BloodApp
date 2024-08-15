// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth'); // Importation des routes d'authentification

const app = express();
const PORT = 5000;

// Configuration du middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes); // Utilisation des routes d'authentification

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/bloodApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
