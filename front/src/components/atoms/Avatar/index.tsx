import styles from './styles.module.scss'

type AvatarProps = {
  displayStatus?: boolean
  status?: 'online' | 'offline' | 'away' | 'nodisturb'
}

import skypeAvatar from '../../../assets/img/skype-avatar.png'

const Avatar = ({ displayStatus = true, status = 'online' }: AvatarProps) => {
  return (
    <div className={styles.avatar}>
      <img
        alt="profil picture"
        src={skypeAvatar}
      />
      {displayStatus && (
          <span className={`${styles.status} ${styles[`status-${status}`]}`}></span>
      )}
    </div>
  )
}

export default Avatar
