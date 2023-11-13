'use client';
//Node Modules
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, FieldValues } from 'react-hook-form';

// Project Files
import { getUser, login } from '@/services/user.service';
import { useUser } from '@/state/UserContextProvider';
import styles from '@/styles/Form.module.css';

export default function LoginForm() {
	//Global variables
	const router = useRouter();
	const { setUser } = useUser();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	//Local states
	const [invalidLoginAttempt, setInvalidLoginAttempt] = useState(false);

	async function onSubmit(data: FieldValues) {
		const userExist = await login(data.email, data.password);

		if (userExist) {
			const user = await getUser(data.email);
			setUser({ type: 'initialise', payload: user });
			router.push('/dashboard');
		} else {
			setInvalidLoginAttempt(true);
		}
		reset();
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)} data-testid="form">
			<input {...register('email', { required: 'Email is required' })} type="email" placeholder="Email" />
			{errors.email && <p className={styles.validator}>{`${errors.email.message}`}</p>}
			<input
				{...register('password', {
					required: 'Password is required',
					onChange: () => {
						setInvalidLoginAttempt(false);
					},
				})}
				type="password"
				placeholder="Password"
			/>
			{errors.password && <p className={styles.validator}>{`${errors.password.message}`}</p>}
			{invalidLoginAttempt && (
				<span className={`${styles.validator} ${styles[`validator--login`]}`}>Incorrect username or password.</span>
			)}
			<button className={styles.button} type="submit">
				Sign in
			</button>
		</form>
	);
}
