//Node Modules
import Image from 'next/image';
//Project Files
import styles from '@/styles/Header.module.css';
import { useUser } from '@/state/UserContextProvider';

export default function Header() {
	const { user } = useUser();

	return (
		<header className={styles.header}>
			<button className={styles.logo_holder} aria-label="home logo">
				<picture>
					<source media="(min-width:1440px)" srcSet="/assets/logo_laptop.png" />
					<img src="/assets/logo_mobile.png" alt="Home logo" className={styles.logo} />
				</picture>
			</button>
			<section className={styles.input_holder}>
				<Image className={styles.search_icon} src="/assets/search.svg" alt="Search icon" height={20} width={18} />
				<label htmlFor="searchInput" className={styles.visually_hidden}>
					Search
				</label>
				<input id="searchInput" className={styles.input} placeholder="Search" />
			</section>
			<section className={styles.user_details}>
				<Image className={styles.avatar} src="/assets/avatar.png" alt="avatar" height={50} width={50} />
				<div className={styles.name_title}>
					<span>
						{user.firstName} {user.lastName}
					</span>
					<span>Title</span>
				</div>
			</section>
		</header>
	);
}
