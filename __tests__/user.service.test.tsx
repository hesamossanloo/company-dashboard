//Project Files
import { getUser, createUser, login } from '@/services/user.service';

//Set Up
const users = [
	{ id: 1, firstName: 'Hesam', lastName: 'Ossanloo', email: 'hesam@ossanloo.com', password: '1234' },
	{
		id: 2,
		firstName: 'John',
		lastName: 'Johnson',
		email: 'john@johnson.com',
		password: '1234',
	},
];

const usersWithNewUser = [
	...users,
	{ id: 3, firstName: 'elon', lastName: 'R', email: 'elon@soolv.ai', password: '1234' },
];

const loginList = users.map((data) => {
	return { id: data.id, email: data.email, password: data.password };
});

beforeEach(() => {
	global.fetch = jest.fn((apiEndPoint, opts) => {
		if (apiEndPoint === '/api/users') {
			if (opts) {
				const method = opts.method;
				if (method === 'POST') {
					return Promise.resolve({
						status: 201,
						json: () => Promise.resolve(usersWithNewUser),
					});
				}
			} else {
				return Promise.resolve({
					status: 200,
					json: () => Promise.resolve(users),
				});
			}
		} else if (apiEndPoint === '/api/login') {
			return Promise.resolve({
				status: 200,
				json: () => Promise.resolve(loginList),
			});
		}
	}) as jest.Mock;
});

//Test-1

test('getUser calls fetch when it is invoked', async () => {
	//Act
	getUser('john@johnson.com');

	// Assert
	expect(fetch).toHaveBeenCalledTimes(1);
});

//Test-2

test('getUser returns the correct user', async () => {
	//Act
	const user = await getUser('john@johnson.com');
	const expectedResult = {
		id: 2,
		firstName: 'John',
		lastName: 'Johnson',
		email: 'john@johnson.com',
		password: '1234',
	};

	// Assert
	expect(user).toEqual(expectedResult);
});

//Test-3

test('createUser calls fetch with correct parameters', async () => {
	//Act
	await createUser('elon', 'R', 'elon@soolv.ai', '1234');

	// Assert
	expect(fetch).toBeCalledWith('/api/users', {
		method: 'POST',
		body: JSON.stringify({
			firstName: 'elon',
			lastName: 'R',
			email: 'elon@soolv.ai',
			password: '1234',
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	});
});

//Test-4

test('login returns true if user exists', async () => {
	//Act
	const userExists = await login('john@johnson.com', '1234');

	//Assert
	expect(userExists).toBe(true);
});

//Test-5

test('login returns false if user does not exist', async () => {
	//Act
	const userExists = await login('hello@soolv.ai', '1234');

	//Assert
	expect(userExists).toBe(false);
});

//Cleanup
afterEach(() => {
	jest.clearAllMocks();
});
