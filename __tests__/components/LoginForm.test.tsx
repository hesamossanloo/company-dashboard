import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { AppRouterContext, AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { User } from '@/state/UserReducer';
import UserContextProvider from '@/state/UserContextProvider';
import '@testing-library/jest-dom';

//----- setup variables and mocks ------

//Mock user to test
const mockUser: User = {
	firstName: 'Hesam',
	lastName: 'Ossanloo',
	email: 'hesam@ossanloo.com',
	password: '1234',
};

// Define a mock provider for AppRouterContext
type AppRouterContextProviderMockProps = {
	router: Partial<AppRouterInstance>;
	children: React.ReactNode;
};

// Mocked router instance with jest.fn() functions
const AppRouterContextProviderMock = ({ router, children }: AppRouterContextProviderMockProps): React.ReactNode => {
	const mockedRouter: AppRouterInstance = {
		back: jest.fn(),
		forward: jest.fn(),
		push: jest.fn(),
		replace: jest.fn(),
		refresh: jest.fn(),
		prefetch: jest.fn(),
		...router,
	};
	return <AppRouterContext.Provider value={mockedRouter}>{children}</AppRouterContext.Provider>;
};

/*Mock login service inside onSubmit function in LoginForm.tsx with a resolved Promise that returns 
true in the first iteration and false in a second iteration*/
const loginFn = jest
	.fn()
	.mockImplementationOnce(() => Promise.resolve(true))
	.mockImplementationOnce(() => Promise.resolve(false));

//Mock getUser service inside onSubmit function in LoginForm.tsx with a resolved Promise that returns the 'mockUser' data
const getUserFn = jest.fn(() => Promise.resolve(mockUser));

//Mock the router's push function
const push = jest.fn();

//Mock user.service module
jest.mock('../../services/user.service', () => {
	return {
		__esModule: true,
		...jest.requireActual('../../services/user.service'), // Maintain real implementations for unmocked functions.
		login: loginFn, // Replace 'login' function with 'loginFn'.
		getUser: getUserFn, // Replace 'getUser' function with 'getUserFn'.
	};
});

//-----Test 1-----
test('should submit the form with correct values', async () => {
	// Render the LoginForm component with mocked router and user context
	const LoginForm = require('../../components/LoginForm').default;

	render(
		<AppRouterContextProviderMock router={{ push }}>
			<UserContextProvider>
				<LoginForm />
			</UserContextProvider>
		</AppRouterContextProviderMock>
	);

	// Get form input elements
	const emailInput = screen.getByPlaceholderText('Email');
	const passwordInput = screen.getByPlaceholderText('Password');
	const submitButton = screen.getByRole('button');

	// Simulate user input and form submission
	fireEvent.change(emailInput, { target: { value: 'hesam@ossanloo.com' } });
	fireEvent.change(passwordInput, { target: { value: '1234' } });
	fireEvent.submit(submitButton);

	// Wait for the functions to be called with expected arguments
	await waitFor(() => expect(loginFn).toHaveBeenCalledWith('hesam@ossanloo.com', '1234'));
	await waitFor(() => expect(getUserFn).toHaveBeenCalledWith('hesam@ossanloo.com'));
	await waitFor(() => expect(push).toHaveBeenCalled());
});

//-----Test 2-----
test('login should not work if the data is incorrect', async () => {
	// Mock window alert function
	jest.spyOn(window, 'alert').mockImplementation(() => {});

	// Render the LoginForm component with mocked router and user context
	const LoginForm = require('../../components/LoginForm').default;

	render(
		<AppRouterContextProviderMock router={{}}>
			<UserContextProvider>
				<LoginForm />
			</UserContextProvider>
		</AppRouterContextProviderMock>
	);

	// Get form input elements
	const emailInput = screen.getByPlaceholderText('Email');
	const passwordInput = screen.getByPlaceholderText('Password');
	const submitButton = screen.getByRole('button');

	// Simulate user input and form submission
	fireEvent.change(emailInput, { target: { value: 'example@example.com' } });
	fireEvent.change(passwordInput, { target: { value: '1234' } });
	fireEvent.submit(submitButton);

	// Wait for the functions to be called with expected arguments
	await waitFor(() => {
		expect(loginFn).toHaveBeenCalledWith('example@example.com', '1234');
		const errorMessage = screen.getAllByText(/Incorrect username or password/i);
		expect(errorMessage).toBeInTheDocument;
	});
});
