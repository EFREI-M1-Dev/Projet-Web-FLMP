import Avatar from '../../../../atoms/Avatar'
import styles from './styles.module.scss'

import cloudTop from '../../../../../assets/img/cloud-top-bar.svg'

const Header = () => {
  return (
    <div className={styles.header}>
      <img className={styles.cloud} src={cloudTop} />
      <Avatar />
      <div className={styles.infos_user}>
        <span>Louis Le BG</span>
        <span>Online</span>
      </div>
    </div>
  )
}

export default Header
