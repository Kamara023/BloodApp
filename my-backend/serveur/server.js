// Importation des modules nécessaires
const authRoutes = require('../routes/auth'); // Assurez-vous que le chemin est correct
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Utiliser les routes d'authentification
app.use('/api/auth', authRoutes);

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Définir un port pour le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
