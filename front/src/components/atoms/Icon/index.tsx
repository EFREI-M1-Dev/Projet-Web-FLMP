import styles from './styles.module.scss'
import icons from './icons'

type IconProps = {
  name: string
  size?: 'small' | 'medium' | 'large'
  color?: string
}

const Icon = ({ name, size = 'medium', color }: IconProps) => {
  const IconComponent = icons[name]

  if (!IconComponent) {
    console.error(`L'icône "${name}" n'existe pas.`)
    return null // Assurez-vous de retourner null en cas d'erreur pour éviter les erreurs de rendu
  }

  return (
    <IconComponent
      className={`${styles.icon} ${styles[`size-${size}`]}`}
      color={color}
    />
  )
}

export default Icon
