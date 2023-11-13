import users from '@/data/users.json';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const id = users.length + 1;
		const firstName = req.body.firstName;
		const lastName = req.body.lastName;
		const email = req.body.email;
		const password = req.body.password;
		const newUser = {
			id: id,
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password,
		};
		users.push(newUser);
		res.status(201).json({ newUser, ...newUser });
	} else {
		res.status(200).json(users);
	}
}
