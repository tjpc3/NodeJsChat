var LocalStrategy   = require('passport-local').Strategy;

var User            = require('../app/models/user');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
      done(null, user);
    });

    passport.deserializeUser(function(user, done) {
      done(null, user);
    });

    passport.use('signup', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, username, password, done) {
        User.findOne({ 'username' :  username }, function(err, user) {

            if (err){
              return done(err);
            }

            if (username.length > 15)
              return done(null, false, req.flash('signupMessage', 'Your username must not exceed 15 characters.'));

            if (username.length < 4)
              return done(null, false, req.flash('signupMessage', 'Your username must be at least 4 characters.'));

            if (password.length > 100)
              return done(null, false, req.flash('signupMessage', 'Your password must be at least 6 characters.'));

            if (username.length < 4)
              return done(null, false, req.flash('signupMessage', 'Your password must must not exceed 100 characters.'));

            if (user) {
              return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
            } else {

                var newUser            = new User();

                newUser.username    = username;
                newUser.password = newUser.generateHash(password);

                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });

    }));

    passport.use('login', new LocalStrategy({

       usernameField : 'username',
       passwordField : 'password',
       passReqToCallback : true
   },
   function(req, username, password, done) {

       User.findOne({ 'username' :  username }, function(err, user) {

           if (err)
               return done(err);

           if (user == null)
               return done(null, false, req.flash('loginMessage', 'No user found.'));

           if (!user.validPassword(password))
               return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

           return done(null, user);
       });

   }));

};
