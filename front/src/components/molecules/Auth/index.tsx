import ButtonText from '../../../components/atoms/ButtonText';
import InputText from '../../../components/molecules/InputText';
import styles from './styles.module.scss'
import { useState } from 'react'


export type UserInfoPropType = {
	name?: string,
	password?: string
};


type AuthPropType = {
	title: string,
	info: string,
	buttonText: string
};

const Auth = ({title, info, buttonText}: AuthPropType) => {
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
				<h1 className={styles.header__title}>{title}</h1>
			</div>
			<div className={styles.login}>
				<h1>{info}</h1>
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

					<ButtonText text={buttonText}/>
				</form>
			</div>
		</div>
	);
};

export default Auth;