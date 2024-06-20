import styles from './styles.module.scss'
import { Link } from 'react-router-dom'

/* components */
import Icon from '../../../../atoms/Icon'

type MenuSelectionProps = {}

const MenuSelection = ({}: MenuSelectionProps) => {
  return (
    <ul className={styles.menu_selection}>
      <Link to="/">
        <li>
          <Icon name="house" size="small" color="#0B9CD5" />
          <span>Home</span>
        </li>
      </Link>
      <Link to="/add-contact">
        <li>
          <Icon name="add_contact" size="small" color="#0B9CD5" />
          <span>Add contact</span>
        </li>
      </Link>
      <Link to="/404">
        <li>
          <Icon name="pad" size="small" color="#0B9CD5" />
          <span>Call phones</span>
        </li>
      </Link>
    </ul>
  )
}

export default MenuSelection
