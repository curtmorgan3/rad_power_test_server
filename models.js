const Sequelize = require('sequelize');
const { createHash } = require('./passwordEncrypt.js');
const DATABASE_NAME = "";

const sequelize = new Sequelize({
	database: DATABASE_NAME,
	dialect: 'postgres',
	operatorsAliases: false,
	define: {
		underscored: true
	},
});

// Models
const User = sequelize.define('User', {
	email: Sequelize.STRING,
	password: Sequelize.STRING
});
// End Models

// Associations
// End Associations

// Hooks 
User.beforeCreate(async (user, options) => {
	const passwordDigest = await createHash(user.password);
	user.password = passwordDigest;
});

User.beforeUpdate(async (user, options) => {
	if (options.fields.includes('password')) {
		const passwordDigest = await createHash(user.password);
		user.password = passwordDigest;
	}
});
// End Hooks


module.exports = {
	sequelize,
	User
}
