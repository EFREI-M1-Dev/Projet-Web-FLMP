import Auth from '../../../components/templates/Auth';

const Register = () => {
	return (
		<Auth 
			title='Welcome to Skype.'
			info='Create account'
			buttonText='Register me in.'
			redirectionLink='/login'
			redirectionText='Sign in'
		/>
	);
};

export default Register;