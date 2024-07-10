import styles from './styles.module.scss'
import Button from '../../components/atoms/Button'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className={styles.not_found}>
      <img src="fav.png" alt="Logo Skype" />
      <h1>404</h1>
      <div>
        <p>Page not found.</p>
        <p>Page you search for is missing or has been moved.</p>
      </div>

      <Link to="/">
        <Button>Return to home</Button>
      </Link>
    </div>
  )
}

export default NotFound
