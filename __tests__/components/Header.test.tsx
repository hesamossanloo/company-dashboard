import { User } from '@/state/UserReducer';
import { render, screen } from '@testing-library/react';
import UserContextProvider from '@/state/UserContextProvider';
import Header from '@/components/Header';
import '@testing-library/jest-dom';

//----- setup variables and mocks ------

//Mock user for the context
const mockUser: User = {
	firstName: 'Hesam',
	lastName: 'Ossanloo',
	email: 'hesam@ossanloo.com',
	password: '1234',
};

//Mock setUser for the context
const mockSetUser = jest.fn();

//Mock the context
const mockUserContextValue = {
	user: mockUser,
	setUser: mockSetUser,
};

//Mock UserContextProvider module
jest.mock('../../state/UserContextProvider', () => {
	return {
		__esModule: true,
		...jest.requireActual('../../state/UserContextProvider'),
		useUser: jest.fn(() => mockUserContextValue),
	};
});

//-----Test 1-----
test('Header must render user name and last name', () => {
	render(
		<UserContextProvider>
			<Header />
		</UserContextProvider>
	);
	const userNameElement = screen.getByText(`${mockUser.firstName} ${mockUser.lastName}`);
	expect(userNameElement).toBeInTheDocument();
});
