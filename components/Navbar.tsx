//Node Modules
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/state/UserContextProvider';
//Project Files
import styles from '@/styles/Navbar.module.css';
import NavLink from './NavLink';
import FullWidthNavLink from './FullWidthNavLink';

//Types of the props that Navbar accepts
type NavbarProps = {
	setSelection: React.Dispatch<React.SetStateAction<string>>;
};

export default function Navbar({ setSelection }: NavbarProps) {
	//Global variables
	const router = useRouter();
	const { setUser } = useUser();

	// State to track the selected link
	const [selectedLink, setSelectedLink] = useState('advisor');

	// Array of links (could also be fetched or derived from props)
	const links = [
		{ id: 'home', label: 'Home' },
		{ id: 'advisor', label: 'Virtual Advisor' },
		{ id: 'search', label: 'Analytics' },
		{ id: 'billing', label: 'Billing' },
		{ id: 'settings', label: 'Settings' },
		{ id: 'logout', label: 'Logout' },
		// Add other links as needed
	];
	//Functions
	function logout() {
		setUser({
			type: 'remove',
			payload: {
				firstName: '',
				lastName: '',
				email: '',
				password: '',
			},
		});
		router.push('/');
	}
	const handleLinkClick = (linkID: string) => {
		setSelectedLink(linkID);
		linkID === 'logout' ? logout() : setSelection(`${linkID}`);
	};

	return (
		<nav className={styles.navbar}>
			{links.map((link) => (
				<FullWidthNavLink key={link.id} isSelected={selectedLink === link.id} onClick={() => handleLinkClick(link.id)}>
					<NavLink linkID={link.id} label={link.label} />
				</FullWidthNavLink>
			))}
		</nav>
	);
}
