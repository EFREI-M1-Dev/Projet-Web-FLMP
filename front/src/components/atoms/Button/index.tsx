import styles from './styles.module.scss'
import React from "react";

type ButtonProps = {
    children?: string | React.ReactElement[]
    text: string,
    onClick?: () => void
}

const Button = ({text}: ButtonProps) => {
    return (
        <button className={styles.button}>{text}</button>
    )
}

export default Button