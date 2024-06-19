import { useNavigate } from 'react-router'
import { ROUTES } from '../../config/constants'
import styles from './styles.module.scss'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.not_found}>
      <h1>404</h1>
      <p>Page not found</p>
      <button onClick={() => navigate(ROUTES.HOME)}>Return to home</button>
    </div>
  )
}

export default NotFound
