const User = require('../models/User')
const passport = require('../config/passport')

exports.signup = async (req, res) => {
  const { name, email, password } = req.body
  const user = await User.register({ name, email }, password)
  res.status(201).json({ user, msg: 'User created' })
}

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).json({ err, info })
    if (!user) return res.status(401).json({ err: { ...info } })
    req.login(user, error => {
      if (error) return res.status(401).json({ error })
      return res.status(200).json({ user })
    })
  })(req, res, next)
}

exports.facebook = passport.authenticate('facebook', { scope: ['email'] })

exports.facebookCb = (req, res, next) => {
  passport.authenticate('facebook', { scope: ['email'] }, (err, user, info) => {
    if (err) return res.status(500).json({ err, info })
    if (!user) return res.status(401).json({ err, info })
    req.login(user, error => {
      if (error) return res.status(401).json({ error })
      return res.redirect('http://localhost:3001/?status=success')
    })
  })(req, res, next)
}

exports.google = passport.authenticate('google', {
  scope: ['profile', 'email'],
})

exports.googleCb = (req, res, next) => {
  passport.authenticate(
    'google',
    { scope: ['profile', 'email'] },
    (err, user, info) => {
      if (err) return res.status(500).json({ err, info })
      if (!user) return res.status(401).json({ err, info })
      req.login(user, error => {
        if (error) return res.status(401).json({ error })
        return res.redirect('http://localhost:3001/?status=success')
      })
    }
  )(req, res, next)
}

exports.currentUser = (req, res) => res.status(200).json({ user: req.user })

exports.logout = (req, res) => {
  req.logout()
  res.status(200).json({ msg: 'Logged out' })
}
