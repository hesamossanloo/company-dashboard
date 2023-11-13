export type User = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};

export type UserAction = {
	type: string;
	payload: User;
};

export function userReducer(state: User, action: UserAction): User {
	switch (action.type) {
		case 'initialise':
			return setUser(state, action);
		case 'remove':
			return removeUser();
		default:
			throw new Error('Unhandled action: ' + action.type);
	}
}

function setUser(state: User, action: UserAction) {
	state = action.payload;
	return state;
}

function removeUser() {
	return {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	};
}
