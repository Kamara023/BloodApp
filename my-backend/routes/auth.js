// // routes/auth.js
// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');

// // Route pour l'inscription
// router.post('/register', async (req, res) => {
//   const { username, password } = req.body;

//   // Vérifier si l'utilisateur existe déjà
//   const existingUser = await User.findOne({ username });
//   if (existingUser) return res.status(400).json({ message: 'User already exists' });

//   // Créer un nouvel utilisateur
//   const user = new User({ username, password });
//   await user.save();
//   res.status(201).json({ message: 'User registered successfully' });
// });

// // Route pour la connexion
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   // Trouver l'utilisateur
//   const user = await User.findOne({ username });
//   if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//   // Vérifier le mot de passe
//   const isMatch = await user.comparePassword(password);
//   if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//   // Générer un token JWT
//   const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
//   res.json({ token });
// });

// module.exports = router;





// // routes/auth.js
// const express = require('express');
// const passport = require('passport');
// const router = express.Router();

// const User = require('../models/User');
// const nodemailer = require('nodemailer');

// // Configuration du transporteur d'email
// const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: 'your_email@gmail.com',
//         pass: 'your_email_password',
//     },
// });

// // Route pour l'inscription
// router.post('/register', async (req, res) => {
//     const { username, email, password, confirmPassword, bloodType, city } = req.body;

//     if (password !== confirmPassword) {
//         return res.status(400).json({ message: 'Passwords do not match' });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//         return res.status(400).json({ message: 'User already exists' });
//     }

//     const user = new User({ username, email, password, bloodType, city });
//     await user.save();
//     res.status(201).json({ message: 'User registered successfully' });
// });

// // Route pour réinitialiser le mot de passe
// router.post('/forgot-password', async (req, res) => {
//     const { email } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//         return res.status(400).json({ message: 'No account with that email address' });
//     }

//     const token = user.generateResetToken();
//     await user.save();

//     const mailOptions = {
//         to: email,
//         from: 'your_email@gmail.com',
//         subject: 'Password Reset',
//         text: `Your password reset code is ${token}`,
//     };

//     transporter.sendMail(mailOptions, (err) => {
//         if (err) {
//             return res.status(500).json({ message: 'Failed to send email' });
//         }
//         res.status(200).json({ message: 'Reset code sent to email' });
//     });
// });

// // Route pour réinitialiser le mot de passe avec le code OTP
// router.post('/reset-password', async (req, res) => {
//     const { email, token, newPassword, confirmNewPassword } = req.body;

//     const user = await User.findOne({ email, resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
//     if (!user) {
//         return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
//     }

//     if (newPassword !== confirmNewPassword) {
//         return res.status(400).json({ message: 'Passwords do not match' });
//     }

//     user.password = newPassword;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;
//     await user.save();
//     res.status(200).json({ message: 'Password has been reset' });
// });

// // Authentification Google
// router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// router.get('/google/callback', passport.authenticate('google'), (req, res) => {
//     res.redirect('/profile'); // Redirection après la connexion
// });

// // Authentification Facebook
// router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// router.get('/facebook/callback', passport.authenticate('facebook'), (req, res) => {
//     res.redirect('/profile'); // Redirection après la connexion
// });

// module.exports = router;





// routes/auth.js
const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Configuration du transporteur d'email
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'kamarakarim023@gmail.com', // Remplacez par votre email
        pass: 'Password123', // Remplacez par votre mot de passe email
    },
});

// Route pour l'inscription
router.post('/register', async (req, res) => {
    const { username, email, password, confirmPassword, bloodType, city } = req.body;

    // Vérification des champs requis
    if (!username || !email || !password || !confirmPassword || !bloodType || !city) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Vérification de la correspondance des mots de passe
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        // Vérification si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Création d'un nouvel utilisateur
        const user = new User({ username, email, password, bloodType, city });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Route pour demander la réinitialisation du mot de passe
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        // Vérification si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'No account with that email address' });
        }

        // Génération du token de réinitialisation
        const token = user.generateResetToken();
        await user.save();

        // Configuration et envoi de l'email
        const mailOptions = {
            to: email,
            from: 'kamarakarim023@gmail.com', // Remplacez par votre email
            subject: 'Password Reset',
            text: `Your password reset code is ${token}`, // Code de réinitialisation envoyé dans l'email
        };

        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to send email' });
            }
            res.status(200).json({ message: 'Reset code sent to email' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Route pour réinitialiser le mot de passe avec le code OTP
router.post('/reset-password', async (req, res) => {
    const { email, token, newPassword, confirmNewPassword } = req.body;

    try {
        // Vérification du token de réinitialisation
        const user = await User.findOne({ email, resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
        }

        // Vérification de la correspondance des nouveaux mots de passe
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Mise à jour du mot de passe
        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        res.status(200).json({ message: 'Password has been reset' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Authentification Google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile'); // Redirection après la connexion
});

// Authentification Facebook
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback', passport.authenticate('facebook'), (req, res) => {
    res.redirect('/profile'); // Redirection après la connexion
});

// Route pour la connexion
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Vérification des champs requis
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Recherche de l'utilisateur par email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Vérification du mot de passe
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Si tout est bon, on peut retourner un message de succès
        // ou générer un token JWT si nécessaire
        return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
});


module.exports = router;
