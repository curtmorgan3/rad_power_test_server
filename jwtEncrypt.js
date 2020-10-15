const jwt = require('jsonwebtoken');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { User } = require('./models.js');

const SECRET = process.env.SECRET;

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: SECRET,
};

passport.use(new JwtStrategy(opts, async (payload, done) => {
	try {
		const user = await User.findByPk(payload.id);
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
