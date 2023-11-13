import { render, fireEvent, screen, waitFor } from '@testing-library/react';

//-----Test 1-----

//Mock createUser function
const createUser = jest.fn();

//Mock user.service module
jest.mock('../../services/user.service', () => {
	return {
		__esModule: true,
		...jest.requireActual('../../services/user.service'), // Maintain real implementations for unmocked functions.
		createUser: createUser, // Replace 'login' function with 'loginFn'.
	};
});

test('creates a new user', async () => {
	const CreateAccountForm = require('../../components/CreateAccountForm').default;
	render(<CreateAccountForm />);

	// Get form input elements
	const nameInput = screen.getByPlaceholderText('First name');
	const lastNameInput = screen.getByPlaceholderText('Last name');
	const emailInput = screen.getByPlaceholderText('Email');
	const confirmEmailInput = screen.getByPlaceholderText('Verify email');
	const passwordInput = screen.getByPlaceholderText('Password');
	const submitButton = screen.getByRole('button');

	// Simulate user input and form submission
	fireEvent.change(nameInput, { target: { value: 'Hesam' } });
	fireEvent.change(lastNameInput, { target: { value: 'Ossanloo' } });
	fireEvent.change(emailInput, { target: { value: 'hesam@ossanloo.com' } });
	fireEvent.change(confirmEmailInput, { target: { value: 'hesam@ossanloo.com' } });
	fireEvent.change(passwordInput, { target: { value: '1234' } });
	fireEvent.submit(submitButton);

	// Wait for the functions to be called with expected arguments
	await waitFor(() => expect(createUser).toHaveBeenCalledWith('Hesam', 'Ossanloo', 'hesam@ossanloo.com', '1234'));
});
