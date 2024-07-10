import React from 'react'
import styles from './styles.module.scss'

type ButtonProps = {
  children?: string | React.ReactElement[]
  onClick?: () => void
}

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {children}
    </button>
  )
}

export default Button
