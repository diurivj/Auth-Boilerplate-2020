const router = require('express').Router()
const { catchErrors, isLogged } = require('../middlewares/catchErrors')
const {
  signup,
  login,
  facebook,
  facebookCb,
  google,
  googleCb,
  currentUser,
  logout,
} = require('../controllers/auth.controller')

router.post('/signup', catchErrors(signup))
router.post('/login', login)
router.get('/facebook', facebook)
router.get('/facebook/redirect', facebookCb)
router.get('/google', google)
router.get('/google/redirect', googleCb)
router.get('/currentUser', isLogged, currentUser)
router.get('/logout', logout)

module.exports = router
