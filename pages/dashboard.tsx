//Node Modules
import React from 'react';
import { useState } from 'react';

//Project Files
import styles from '@/styles/Dashboard.module.css';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import Chat from '@/components/Chat';

export default function Dashboard() {
	const [selection, setSelection] = useState<string>('advisor');

	//Functions
	function renderComponent() {
		switch (selection) {
			case 'advisor':
				return <Chat />;
			default:
				return <div className={styles.mock_component}>{selection}</div>;
		}
	}

	return (
		<div className={styles.dashboard}>
			<Header />
			{renderComponent()}
			<Navbar setSelection={setSelection} />
		</div>
	);
}
