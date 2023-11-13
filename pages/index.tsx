// Node Modules
import Link from 'next/link';
import Image from 'next/image';

// Project Files
import Form from '@/components/LoginForm';
import styles from '@/styles/Home.module.css';

export default function Home() {
	return (
		<div className={styles.login}>
			<div className={styles.home}>
				<Image src="/assets/logo_laptop.png" alt="soolv-ai-logo" width={181} height={66} />
				<span className={styles.title}>Sign in to continue</span>
				<Form />
				<div className={styles.linkContainer}>
					<span className={styles.link}>
						<Link href="/recover-password">Forgot your password? </Link>
					</span>
					<span className={styles.link}>
						<Link href="/sign-up">Create an account </Link>
					</span>
				</div>
				<div className={styles.login_options}>
					<span className={styles.title}>Or sign in with:</span>
					<Image src="/assets/google_logo.svg" alt="google-logo" width={30} height={50} />
				</div>
			</div>
		</div>
	);
}
