require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const handleErrors = require('./middleware/handleErrors');

const PORT = process.env.PORT || 3001;

// Routers 
const { userRouter } = require('./routes/userRouter.js');
// End routers

const app = express();

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cors());
app.use(handleErrors);
/////////////

// Connect Routers
app.use('/users', userRouter);
// End connect routers

app.get('/', (req, res) => {
	res.json({msg: "Index Page"});
});

app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));
