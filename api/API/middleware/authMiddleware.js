const passport = require('passport');

const authenticateJWT = passport.authenticate('jwt', { session: false });

const authenticateJWTWithLogging = (req, res, next) => {
    console.log('Authenticating JWT...');
    return authenticateJWT(req, res, (err) => {
        if (err) {
            console.log('Error authenticating JWT:', err);
        } else if (!req.user) {
            console.log('No user found with this JWT');
        } else {
            console.log('User authenticated successfully');
        }
        
        // Call the next middleware or route handler
        next();
    });
};

module.exports = {
    authenticateJWT,
    authenticateJWTWithLogging
};
