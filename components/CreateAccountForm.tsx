import React from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import styles from '@/styles/Form.module.css';
import { createUser } from '@/services/user.service';

type FormInputs = {
	firstName: string;
	lastName: string;
	email: string;
	confirmEmail: String;
	password: string;
};

export default function CreateAccountForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		reset,
	} = useForm<FormInputs>();

	async function onSubmit(data: FieldValues) {
		await createUser(data.firstName, data.lastName, data.email, data.password);
		reset();
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<input {...register('firstName', { required: 'Name is required' })} type="text" placeholder="First name" />
			{errors.firstName && <p className={styles.validator}>{`${errors.firstName.message}`}</p>}

			<input {...register('lastName', { required: 'Last name is required' })} type="text" placeholder="Last name" />
			{errors.lastName && <p className={styles.validator}>{`${errors.lastName.message}`}</p>}

			<input {...register('email', { required: 'Email is required' })} type="email" placeholder="Email" />
			{errors.email && <p className={styles.validator}>{`${errors.email.message}`}</p>}

			<input
				{...register('confirmEmail', {
					required: 'Email is required',
					validate: (value) => value === getValues('email') || 'Email must match',
				})}
				type="email"
				placeholder="Verify email"
			/>
			{errors.confirmEmail && <p className={styles.validator}>{`${errors.confirmEmail.message}`}</p>}

			<input
				{...register('password', {
					required: 'Password is required',
					minLength: {
						value: 10,
						message: 'Password must be at least 10 characters',
					},
				})}
				type="password"
				placeholder="Password"
			/>
			{errors.password && <p className={styles.validator}>{`${errors.password.message}`}</p>}

			<button type="submit" className={styles.button}>
				Continue
			</button>
		</form>
	);
}
