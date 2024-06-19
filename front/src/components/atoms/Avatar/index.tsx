import styles from './styles.module.scss'

type AvatarProps = {
  displayStatus?: boolean
  status?: 'online' | 'offline'
}

import skypeAvatar from '../../../assets/img/skype-avatar.png'

const Avatar = ({ displayStatus = true, status = 'online' }: AvatarProps) => {
  return (
    <div className={styles.avatar}>
      <img
        alt="profil picture"
        src={skypeAvatar}
      />
      {displayStatus && status === 'online' && <div className={styles.status} />}
    </div>
  )
}

export default Avatar
