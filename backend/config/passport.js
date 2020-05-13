const passport = require('passport')
const User = require('../models/User')
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy

const facebookConfig = {
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_REDIRECT,
  profileFields: ['id', 'email', 'gender', 'link', 'name', 'photos'],
}

const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_REDIRECT,
  profileFields: ['id', 'email', 'gender', 'link', 'name', 'photos'],
}

passport.use(
  new FacebookStrategy(facebookConfig, async (_, __, profile, done) => {
    let user = await User.findOne({ facebookId: profile.id })
    if (!user) {
      user = await User.create({
        name: `${profile.name.givenName} ${profile.name.familyName}`,
        facebookId: profile.id,
        email: profile.emails[0].value,
      })
      return done(null, user)
    } else {
      return done(null, user)
    }
  })
)

passport.use(
  new GoogleStrategy(googleConfig, async (_, __, profile, done) => {
    let user = await User.findOne({ googleId: profile.id })
    if (!user) {
      user = await User.create({
        name: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value,
      })
      return done(null, user)
    } else {
      return done(null, user)
    }
  })
)

passport.use(User.createStrategy())

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser((id, done) =>
  User.findById(id, (err, user) => done(err, user))
)

module.exports = passport
