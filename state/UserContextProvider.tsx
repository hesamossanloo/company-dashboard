// Node modules
import { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';

//Project Files
import { userReducer, User, UserAction } from '@/state/UserReducer';

//Types
type UserContextProviderProps = {
	children: ReactNode;
};

type TUserContext = {
	user: User;
	setUser: Dispatch<UserAction>;
};

//Properties
const UserContext = createContext<TUserContext | null>(null);

export default function UserContextProvider({ children }: UserContextProviderProps) {
	//initialize user
	const init_user: User = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	};

	//State
	const [user, setUser] = useReducer(userReducer, init_user);

	//Properties
	const values: TUserContext = { user, setUser };

	return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}

export function useUser() {
	const context = useContext(UserContext);
	if (!context) throw new Error('useUser only works if the parent component is wrapped in <UserContext>');

	return context;
}
