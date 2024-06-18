import styles from './styles.module.scss'

type ButtonTextProps = {
    text: string
}

const ButtonText = ({text}: ButtonTextProps) => {
    return (
        <button className={styles.button}>{text}</button>
    )
}

export default ButtonText