// // models/User.js
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// // Définition du schéma utilisateur
// const UserSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// // Avant de sauvegarder l'utilisateur, hacher le mot de passe
// UserSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // Méthode pour vérifier le mot de passe
// UserSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// module.exports = mongoose.model('User', UserSchema);







// // models/User.js
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const crypto = require('crypto');

// const UserSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String },
//   googleId: { type: String },
//   facebookId: { type: String },
//   bloodType: { type: String },
//   city: { type: String },
//   resetPasswordToken: { type: String },
//   resetPasswordExpires: { type: Date },
// });

// UserSchema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   }
//   next();
// });

// UserSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// UserSchema.methods.generateResetToken = function () {
//   const token = crypto.randomBytes(4).toString('hex');
//   this.resetPasswordToken = token;
//   this.resetPasswordExpires = Date.now() + 3600000; // 1 heure
//   return token;
// };

// module.exports = mongoose.model('User', UserSchema);



// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Définition du schéma utilisateur
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Nom d'utilisateur requis et unique
  email: { type: String, required: true, unique: true }, // Email requis et unique
  password: { type: String }, // Mot de passe
  googleId: { type: String }, // ID Google pour l'authentification via Google
  facebookId: { type: String }, // ID Facebook pour l'authentification via Facebook
  bloodType: { type: String }, // Groupe sanguin
  city: { type: String }, // Ville
  resetPasswordToken: { type: String }, // Token pour la réinitialisation du mot de passe
  resetPasswordExpires: { type: Date }, // Date d'expiration du token de réinitialisation
});

// Fonction pré-enregistrement pour hacher le mot de passe
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Méthode pour comparer les mots de passe
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Méthode pour générer un token de réinitialisation du mot de passe
UserSchema.methods.generateResetToken = function () {
  const token = crypto.randomBytes(4).toString('hex'); // Génération d'un token de 4 chiffres
  this.resetPasswordToken = token;
  this.resetPasswordExpires = Date.now() + 3600000; // Le token expire dans 1 heure
  return token;
};

module.exports = mongoose.model('User', UserSchema);
