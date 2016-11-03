module.exports = function(app, passport) {

    // Index page
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // Login forum
    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // Process the login form
    app.post('/login', passport.authenticate('login', {
        successRedirect : '/chat',
        failureRedirect : '/login',
        failureFlash : true
    }));

    // Signup forum
    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // Process the signup forum
    app.post('/signup', passport.authenticate('signup', {
        successRedirect : '/chat',
        failureRedirect : '/signup',
        failureFlash : true
    }));

    // Chat viewer
    app.get('/chat', isLoggedIn, function(req, res) {
        res.render('chat.ejs', {
            user : req.user
        });
    });

    // Logout page
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
