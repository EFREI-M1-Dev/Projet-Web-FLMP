import styles from './styles.module.scss'

type AvatarProps = {
  status?: 'online' | 'offline'
}

import skypeAvatar from '../../../assets/img/skype-avatar.png'

const Avatar = ({ status = 'online' }: AvatarProps) => {
  return (
    <div className={styles.avatar}>
      <img
        alt="profil picture"
        src={skypeAvatar}
      />
      {status === 'online' && <div className={styles.status} />}
    </div>
  )
}

export default Avatar
