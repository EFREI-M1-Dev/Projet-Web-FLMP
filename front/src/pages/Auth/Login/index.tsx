import Auth from '../../../components/templates/Auth';

const Login = () => {
	return (
		<Auth 
			title='Welcome back!'
			info='Sign in'
			buttonText='Sign me in'
			redirectionLink='/register'
			redirectionText='Create new account'
		/>
	);
};

export default Login;