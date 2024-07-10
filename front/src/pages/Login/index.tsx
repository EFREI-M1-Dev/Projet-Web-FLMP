import Auth, {UserInfoProps} from '../../components/templates/Auth';
import {useNavigate} from 'react-router-dom'
import {FormEvent, useState} from 'react'
import {useLoginMutation} from '../../generated/graphql'
import {useAppDispatch} from '../../hooks/reduxHooks';
import {setLoggedUser} from '../../features/userConnected';
import {ROUTES} from '../../config/constants';

const Login = () => {
	const [userInfo, setUserInfo] = useState<UserInfoProps>({name: '', password: ''});
	const [login] = useLoginMutation()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const handleChangeUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setUserInfo({
		  ...userInfo,
		  [name]: value,
		})
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault()
		const username = userInfo.name
		const password = userInfo.password

		try {
		  if (!username || !password) {
			return
		  }

		  const { data } = await login({
			variables: { input: { username, password } },
		  })
		  if (data?.login.token) {
			dispatch(setLoggedUser(data.login))
			navigate(ROUTES.HOME)
		  }
		} catch (e) {
		  console.error(e)
		}
	  }

	return (
		<form onSubmit={handleSubmit}>
			<Auth
				title='Welcome back!'
				info='Sign in'
				buttonText='Sign me in'
				redirectionLink='/register'
				redirectionText='Create new account'
				data={userInfo}
				onChange={handleChangeUserInfo}
			/>
		</form>
	);
};

export default Login;