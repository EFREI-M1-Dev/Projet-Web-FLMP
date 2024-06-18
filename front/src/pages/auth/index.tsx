import ButtonText from '../../components/atoms/ButtonText';
import InputText from '../../components/molecules/InputText';
import styles from './styles.module.scss'
import { useState } from 'react'


const Auth = () => {
	const [skypeName, setSkypeName] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const handleSkypeName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSkypeName(e.target.value);
	};
	const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	}


	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1 className={styles.header__title}>Welcome to Skype.</h1>
			</div>
			<div className={styles.login}>
				<form>
					<InputText
						label='Skype Name'
						inputType='text'
						placeholder=''
						value={skypeName}
						onChange={handleSkypeName}/>
					

					<InputText
						label='Password'
						inputType='password'
						placeholder=''
						value={password}
						onChange={handlePassword}/>

					<ButtonText text='Sign me in'/>
				</form>
			</div>
		</div>
	);
};

export default Auth;