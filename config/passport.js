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
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        console.log('dfgsdgAS');
        User.findOne({ 'email' :  email }, function(err, user) {

            if (err){
              return done(err);
            }

            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

                var newUser            = new User();

                newUser.email    = email;
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

       usernameField : 'email',
       passwordField : 'password',
       passReqToCallback : true
   },
   function(req, email, password, done) {

       User.findOne({ 'email' :  email }, function(err, user) {

           if (err)
               return done(err);

           if (!user)
               return done(null, false, req.flash('loginMessage', 'No user found.'));

           if (!user.validPassword(password))
               return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

           return done(null, user);
       });

   }));

};
