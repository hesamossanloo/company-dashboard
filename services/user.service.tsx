export async function getUser(email: String) {
	const response = await fetch('/api/users');
	const data = await response.json();

	const user = data.find((user: { email: String }) => user.email === email);
	return user;
}

export async function createUser(firstName: String, lastName: String, email: String, password: String) {
	const response = await fetch('/api/users', {
		method: 'POST',
		body: JSON.stringify({
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	await response.json();
}

export async function login(email: String, password: String) {
	const response = await fetch('/api/login');
	const data = await response.json();
	const userExist = data.some(
		(user: { email: String; password: String }) => user.email === email && user.password === password
	);

	return userExist;
}
