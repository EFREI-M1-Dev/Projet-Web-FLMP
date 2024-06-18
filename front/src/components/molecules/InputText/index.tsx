import styles from './styles.module.scss'


type InputTextProps = {
    label: string
    inputType: 'text' | 'password'
    placeholder: string
    value: string
    name?: string
    toto?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputText = ({label, inputType, placeholder, value, onChange }: InputTextProps) => {
    return (
        <label className={styles.label}>{label}
            <input
                className={styles.input}
                type={inputType}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </label>
    )
}

export default InputText