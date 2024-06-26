import { Link } from 'react-router-dom';
import Button from '../../atoms/Button';
import InputText from '../../molecules/InputText';
import styles from './styles.module.scss'
import { useState } from 'react'
import skypeLogo from '../../../assets/img/skype-logo.svg'


export type UserInfoProps = {
	name: string,
	password: string
};


type AuthPropType = {
	title: string,
	info: string,
	buttonText: string,
	redirectionLink: string,
	redirectionText: string
};

const Auth = ({title, info, buttonText, redirectionLink, redirectionText}: AuthPropType) => {
	const [userInfo, setUserInfo] = useState<UserInfoProps>({name: '', password: ''});

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
				<form>
					<img src={skypeLogo} alt='Skype Logo'/>
					<h1>{info}</h1>					
					<InputText
						label='Skype Name'
						inputType='text'
						placeholder=''
						name='name'
						value={userInfo.name}
						onChange={handleChangeUserInfo}/>
					

					<InputText
						label='Password'
						inputType='password'
						placeholder=''
						name='password'
						value={userInfo.password}
						onChange={handleChangeUserInfo}/>

					<Button text={buttonText}/>
					<Link className={styles.link} to={redirectionLink}>{redirectionText}</Link>
				</form>
			</div>
		</div>
	);
};

export default Auth;