// Node Modules
import React from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

// Project Files
import style from '@/styles/Home.module.css';
import styles from '@/styles/Form.module.css';

export default function PasswordRecovery() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitted },
		reset,
	} = useForm();

	async function onSubmit() {
		reset();
	}

	return (
		<div className={style.login}>
			<div className={style.home}>
				<Image src="/assets/logo_laptop.png" alt="COMPANY-logo" width={181} height={66} />
				<span className={style.title}>Having trouble signing in?</span>
				<p className={style.text}>
					Enter your email to get started. We will send you a code to your email to sign in. Check your spam folder.
				</p>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<input {...register('email', { required: 'Your email is required' })} type="email" placeholder="Email" />
					{errors.email && <p className={styles.validator}>{`${errors.email.message}`}</p>}
					<button disabled={isSubmitted} className={styles.button} type="submit">
						Continue
					</button>
				</form>
			</div>
		</div>
	);
}
