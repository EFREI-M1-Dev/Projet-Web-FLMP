import { Link } from 'react-router-dom'
import Button from '../../atoms/Button'
import InputText from '../../molecules/InputText'
import styles from './styles.module.scss'
import skypeLogo from '../../../assets/img/skype-logo.svg'

export type UserInfoProps = {
  name: string
  password: string
}

type AuthPropType = {
  title: string
  info: string
  buttonText: string
  redirectionLink: string
  redirectionText: string
  data: UserInfoProps
  msgError?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Auth = ({
  title,
  info,
  buttonText,
  redirectionLink,
  redirectionText,
  data,
  msgError,
  onChange,
}: AuthPropType) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.header__title}>{title}</h1>
      </div>
      <div className={styles.login}>
        <img src={skypeLogo} alt="Skype Logo" />
        <h1>{info}</h1>
        <InputText
          label="Skype Name"
          inputType="text"
          placeholder=""
          name="name"
          value={data.name}
          msgError={msgError}
          onChange={onChange}
        />

        <InputText
          label="Password"
          inputType="password"
          placeholder=""
          name="password"
          value={data.password}
          msgError={msgError}
          onChange={onChange}
        />

        <Button>{buttonText}</Button>
        <span className={styles.error}>{msgError}</span>
        <Link className={styles.link} to={redirectionLink}>
          {redirectionText}
        </Link>
      </div>
    </div>
  )
}

export default Auth
