// config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

// Configurer la stratégie Google
passport.use(new GoogleStrategy(require('./google'), async (accessToken, refreshToken, profile, done) => {
  const user = await User.findOne({ googleId: profile.id });
  if (user) {
    done(null, user);
  } else {
    const newUser = new User({ googleId: profile.id, name: profile.displayName });
    await newUser.save();
    done(null, newUser);
  }
}));

// Configurer la stratégie Facebook
passport.use(new FacebookStrategy(require('./facebook'), async (accessToken, refreshToken, profile, done) => {
  const user = await User.findOne({ facebookId: profile.id });
  if (user) {
    done(null, user);
  } else {
    const newUser = new User({ facebookId: profile.id, name: profile.displayName });
    await newUser.save();
    done(null, newUser);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
