const Sequelize = require('sequelize');
const { User } = require('./models.js');

// Sample data used for testing and development only
async function createUser(){
	await User.destroy({where: {} });
	await User.create({
		email: 'sampleuser@sample.com',
		password: 'password'
	})
};


async function seed(){
	try{
		await createUser();
	}catch(e){
		console.error(e);
	}
	process.exit();
};

seed();
