// Node Modules
import Image from 'next/image';
// Project Files

import style from '@/styles/Home.module.css';
import CreateAccountForm from '../components/CreateAccountForm';

export default function CreateAccount() {
	return (
		<div className={style.login}>
			<div className={style.home}>
				<Image src="/assets/logo_laptop.png" alt="COMPANY-logo" width={181} height={66} />
				<span className={style.title}>Sign Up</span>
				<p className={style.text}>Enter the info below to create your account.</p>
				<CreateAccountForm />
			</div>
		</div>
	);
}
