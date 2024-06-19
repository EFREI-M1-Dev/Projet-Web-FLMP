import ButtonText from '../../../components/atoms/ButtonText';
import InputText from '../../../components/molecules/InputText';
import styles from './styles.module.scss'
import { useState } from 'react'


export type UserInfoPropType = {
	name?: string,
	password?: string
};

const Login = () => {
	const [userInfo, setUserInfo] = useState<UserInfoPropType>({name: undefined, password: undefined});

	const handleChangeUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setUserInfo({
		  ...userInfo,
		  [name]: value,
		})
	};


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
						name='skypeName'
						value={userInfo.name!}
						onChange={handleChangeUserInfo}/>
					

					<InputText
						label='Password'
						inputType='password'
						placeholder=''
						name='password'
						value={userInfo.password!}
						onChange={handleChangeUserInfo}/>

					<ButtonText text='Log me in'/>
				</form>
			</div>
		</div>
	);
};

export default Login;