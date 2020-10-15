const userRouter = require('express').Router();
const { User } = require('../models.js');
const { compare } = require('../passwordEncrypt.js');
const { sign, passport } = require('../jwtEncrypt.js');
const { BadRequest, NotFound, Unauthorized } = require('../utils/errors');

// Create User
userRouter.post('/', async (req, res, next) => {
	try{
		const { email, password } = req.body;

		if (!email || !password) {
			throw new BadRequest('Missing required fileds: email and password');
		}

		const user = await User.create({
			email,
			password
		});

		res.status(200).json({ user });
	}catch (e){
		next(e);
	}
});

// Read User
userRouter.get('/:id', async (req, res, next)=>{
	try{
		const user = await User.findByPk(req.params.id);

		if (!user) {
			throw NotFound(`User with id ${req.params.id} not found.`);
		}

		res.status(200).json({ user });
	}catch(e){
		next(e);
	}
});

// Update Curret User
userRouter.put('/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
	try{
		const { user } = req;
		const { username, password } = req.body;

		user.update({
			username,
			password
		});
		user.save();

		res.status(200).json({ user });
	}catch(e){
		next(e);
	}
});

// Delete User
userRouter.delete('/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
	try{
		const { user } = req;
		await user.destroy();

		res.json({msg: `User ${user.username} destroyed.`})
	}catch (e){
		next(e);
	}
});

// User Login
userRouter.post('/login', async (req, res, next) => {
	try{
		const { email, password } = req.body;

		if (!email || !password) {
			throw BadRequest('Missing required fileds: email and password');
		}

		const user = await User.findOne({where: { email }});
		const isValid = await compare(password, user.password);

		if (isValid){
			const token = sign({
				id: user.id,
				email: user.email,
			});

			res.status(200).json({ user, token });
		}else{
			throw Unauthorized('Invalid credentials.');
		}

	}catch(e){
		next(e);
	}
});

module.exports = {
	userRouter
}
