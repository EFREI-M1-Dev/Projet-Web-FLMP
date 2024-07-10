import Auth, { UserInfoProps } from '../../components/templates/Auth'
import { useNavigate } from 'react-router-dom'
import { FormEvent, useEffect, useState } from 'react'
import { useLoginMutation } from '../../generated/graphql'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { setLoggedUser } from '../../features/userConnected'
import { ROUTES } from '../../config/constants'
import styles from './styles.module.scss'

const Login = () => {
  const [userInfo, setUserInfo] = useState<UserInfoProps>({
    name: '',
    password: '',
  })
  const [msgError, setMsgError] = useState<string>('')
  const [login, { data, loading, error }] = useLoginMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleChangeUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserInfo({
      ...userInfo,
      [name]: value,
    })

    setMsgError('')
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const username = userInfo.name
    const password = userInfo.password

    try {
      if (!username || !password) {
        setMsgError('Please fill all fields')
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

  useEffect(() => {
    if (loading) {
      return
    }
    if (data) {
      console.log('Login successful:', data)
    }
    if (error) {
      console.error('Error:', error)
      setMsgError('An error occured')

      if (error.message === 'Unauthorized') {
        setMsgError('Bad username or password !')
      }
    }
  }, [data, loading, error])

  return (
    <form onSubmit={handleSubmit}>
      <Auth
        title="Welcome back!"
        info="Sign in"
        buttonText="Sign me in"
        redirectionLink="/register"
        redirectionText="Create new account"
        data={userInfo}
        msgError={msgError}
        onChange={handleChangeUserInfo}
      />
    </form>
  )
}

export default Login
