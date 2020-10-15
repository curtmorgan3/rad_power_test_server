const bcrypt = require('bcrypt');
const SALT = parseInt(process.env.SALT);

async function createHash(password){
	const passwordDigest = await bcrypt.hash(password, SALT);
	return passwordDigest;
};

async function compare(password, hashedPassword){
	const isValid = await bcrypt.compare(password, hashedPassword);
	return isValid;
};

module.exports = {
	createHash,
	compare
}
