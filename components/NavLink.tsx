//Node Modules
import React from 'react';
import Image from 'next/image';

//Project Files
import styles from '@/styles/NavLink.module.css';

//Types of the props that NavLink accepts
type NavLinkProps = {
	linkID: string;
	label: string;
};

export default function NavLink({ linkID, label }: NavLinkProps) {
	//Return
	return (
		<div className={styles.nav_link} aria-label={`link to ${linkID}`}>
            <div className={`${styles.icon} ${styles.nav_icon_holder} ${styles[`icon--${linkID}`]}`}>
                <Image src={`/assets/${linkID}.svg`} alt={`${linkID} icon`} fill />
            </div>
            <span className={styles.nav_link_label}>{label}</span>
        </div>
	);
}
