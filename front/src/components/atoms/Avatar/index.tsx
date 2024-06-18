import styles from './styles.module.scss'

type AvatarProps = {
  status?: 'online' | 'offline'
}

const Avatar = ({ status = 'online' }: AvatarProps) => {
  return (
    <div className={styles.avatar}>
      <img
        alt="profil picture"
        src="https://www.aussitot.fr/wp-content/uploads/2006/05/skype-avatar.png"
      />
      {status === 'online' && <div className={styles.status} />}
    </div>
  )
}

export default Avatar
