import { FormEvent, useState } from 'react'
import Auth, { useNavigate } from 'react-router'

/* components */
import { UserInfoProps } from '../../components/templates/Auth'

/* graphql */
import { useRegisterMutation } from '../../generated/graphql'

const Register = () => {
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState<UserInfoProps>({
    name: '',
    password: '',
  })

  const [register] = useRegisterMutation()

  const handleChangeUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserInfo({
      ...userInfo,
      [name]: value,
    })
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const username = userInfo.name
    const password = userInfo.password

    try {
      if (!username || !password) {
        return
      }

      const { data } = await register({
        variables: { input: { username, password } },
      })
      if (data?.signup.username) {
        navigate('/login')
      } else {
        // setMsgError('An error occured, please try again later')
      }
    } catch (e) {
      console.error(e)
      //   setMsgError('An error occured')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Auth
        title="Welcome to Skype"
        info="Create account"
        buttonText="Register me"
        redirectionLink="/login"
        redirectionText="Sign in"
        data={userInfo}
        onChange={handleChangeUserInfo}
      />
    </form>
  )
}

export default Register
