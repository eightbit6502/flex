const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');


const User = require('../models/user');
const constants = require('./constants');

module.exports = function (passport) {
	// Local strategy for email and password authentication
	passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
		try {
			// Find user by email
			const user = await User.findOne({ where: { email: email } });
			if (!user) {
				return done(null, false, { message: 'That email is not registered' });
			}

			// Match password
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return done(null, false, { message: 'Password incorrect' });
			}

			// console.log(user);

			return done(null, user);
		} catch (error) {
			console.error(error);
			return done(error);
		}
	}));

	// JWT strategy for handling JWT tokens
	passport.use(new JWTStrategy({
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: process.env.JWT_SECRET || constants.ENV_JWTSECRET
	}, async (jwtPayload, done) => {
		try {
			
			// Find user by ID
			const user = await User.findByPk(jwtPayload.id);

			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		} catch (error) {
			console.error(error)
			return done(error, false);
		}
	}));
};
