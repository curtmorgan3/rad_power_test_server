require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const handleErrors = require('./middleware/handleErrors');
const { sign, passport } = require('./jwtEncrypt.js');
const { BadRequest } = require('./utils/errors');

const PORT = process.env.PORT || 3001;

// Routers 
const { graphqlRouter } = require('./routes/graphql.js');

const app = express();

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cors());
app.use('/graphql', graphqlRouter);

app.post('/authenticate', (req, res, next) => {
	try {
		if (!req.body.username) {
			throw new BadRequest('Must provide a username');
		}

		const token = sign({
			username: req.body.username,
		});
		
		res.status(200).json({ token });

	} catch (e) {
		next(e);
	}
});

app.use('/', (req, res) => {
	res.json({ msg: 'Morgan Rad Power Test' });
})

app.use(handleErrors);
app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));
