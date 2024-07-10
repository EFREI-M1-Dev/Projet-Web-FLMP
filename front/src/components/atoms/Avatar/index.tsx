import styles from './styles.module.scss'

/* components */
import skypeAvatar from '../../../assets/img/skype-avatar.png'

type AvatarProps = {
  displayStatus?: boolean
  status?: 'online' | 'offline' | 'away' | 'nodisturb'
}

const Avatar = ({ displayStatus = true, status = 'online' }: AvatarProps) => {
  return (
    <div className={styles.avatar}>
      <img alt="profil picture" src={skypeAvatar} />
      {displayStatus && (
        <span
          className={`${styles.status} ${styles[`status-${status}`]}`}
        ></span>
      )}
    </div>
  )
}

export default Avatar
