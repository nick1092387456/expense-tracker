const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

// 登入路由
router.get('/login', (req, res) => {
  res.render('login')
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })
)

// 註冊路由
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  try {
    const theUser = await User.findOne({ email })
    if (theUser) {
      console.log('User already exists.')
      res.render('register', {
        name,
        email,
        password,
        confirmPassword,
      })
    } else {
      await User.create({
        name,
        email,
        password,
      })
      res.redirect('/')
    }
  } catch (error) {
    console.log(error)
  }
})

// 登出路由
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router
