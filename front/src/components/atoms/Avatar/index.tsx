import styles from './styles.module.scss'

type AvatarProps = {
  status?: 'online' | 'offline'
}

const Avatar = ({ status = 'online' }: AvatarProps) => {
  return (
    <div className={styles.avatar}>
      <img
        alt="profil picture"
        src="https://i.pinimg.com/736x/3f/95/54/3f9554c93c06760faa9d3de31337b514.jpg"
      />
      {status === 'online' && <div className={styles.status} />}
    </div>
  )
}

export default Avatar
