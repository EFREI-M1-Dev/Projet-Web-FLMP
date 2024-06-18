import styles from './styles.module.scss'

type AvatarProps = {
  status?: 'online' | 'offline'
}

const Avatar = ({ status = 'online' }: AvatarProps) => {
  return (
    <div className={styles.avatar}>
      <img
        alt="profil picture"
        src="https://media.licdn.com/dms/image/D4E03AQFNpwnodygZ7Q/profile-displayphoto-shrink_200_200/0/1665477529662?e=2147483647&v=beta&t=pxktk_cZmy7OEXM2LAaUfvHjHXGrFQ05mKfANY6bG2Q"
      />
      {status === 'online' && <div className={styles.status} />}
    </div>
  )
}

export default Avatar
