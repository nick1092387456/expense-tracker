const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs') //密碼加密套件

module.exports = (app) => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())

  // 設定本地登入策略
  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true }, //要加入passReqToCallback 要不然不能用req function)
      (req, email, password, done) => {
        User.findOne({ email })
          .then((user) => {
            if (!user) {
              return done(
                null,
                false,
                req.flash('warning_msg', '此信箱未被註冊')
              )
            }
            return bcrypt.compare(password, user.password).then((isMatch) => {
              if (!isMatch) {
                return done(
                  null,
                  false,
                  req.flash('warning_msg', '信箱或密碼不正確')
                )
              }
              return done(null, user)
            })
          })
          .catch((err) => done(err, false))
      }
    )
  )
  // 設定Facebook登入策略
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ['email', 'displayName'],
      },
      (accessToken, refreshToken, profile, done) => {
        const { name, email } = profile._json
        User.findOne({ email }).then((user) => {
          if (user) return done(null, user)

          const randomPassword = Math.random().toString(36).slice(-8)
          bcrypt
            .genSalt(10)
            .then((salt) => bcrypt.hash(randomPassword, salt))
            .then((hash) =>
              User.create({
                name,
                email,
                password: hash,
              })
            )
            .then((user) => done(null, user))
            .catch((err) => done(err, false))
        })
      }
    )
  )

  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser(async (id, done) => {
    const theUser = await User.findById(id).lean()
    try {
      await done(null, theUser)
    } catch (error) {
      await done(error, null)
    }
  })
}

// passport.serializeUser((user, done) => {
//   done(null, user.id)
// })
// passport.deserializeUser((id, done) => {
//   User.findById(id)
//     .lean()
//     .then((user) => done(null, user))
//     .catch((err) => done(err, null))
// })
