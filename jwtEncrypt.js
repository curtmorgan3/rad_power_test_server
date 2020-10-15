const jwt = require('jsonwebtoken');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Whoa! In real life this would be in a .env file.
const SECRET = '1F48AAEBA6F680991DD03D4D4F67E627C779973F23EAC2AC2E81C57B95C98D42';

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: SECRET,
};

passport.use(new JwtStrategy(opts, async (payload, done) => {
	try {
		// Very simple token. As long as the users provides a username, we consider her authenticated.
		const user = payload.username;
		return done(null, user);
	} catch (e) {
		return done(e, false);
	}
}));

function sign(payload) {
	return jwt.sign(payload, SECRET);
}

module.exports = {
	sign,
	passport,
};
