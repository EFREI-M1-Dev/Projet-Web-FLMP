import Icon from '../../../../atoms/Icon'
import styles from './styles.module.scss'

type MenuSelectionProps = {}

const MenuSelection = ({}: MenuSelectionProps) => {
  return (
    <ul className={styles.menu_selection}>
      <li>
        <Icon name="house" size="small" color="#000" />
        <span>Home</span>
      </li>
      <li>
        <Icon name="pad" size="small" color="#000" />
        <span>Call phones</span>
      </li>
    </ul>
  )
}

export default MenuSelection