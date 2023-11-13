import users from '@/data/users.json';

export default async function handler(req, res) {
	const loginList = users.map((data) => {
		return { id: data.id, email: data.email, password: data.password };
	});
	res.status(200).json(loginList);
}
