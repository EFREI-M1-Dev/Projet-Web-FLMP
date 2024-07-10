import styles from './styles.module.scss'


type InputTextProps = {
    label: string
    inputType: 'text' | 'password'
    placeholder: string
    name: string
    value: string
    msgError?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputText = ({label, inputType, placeholder, name, value, msgError, onChange}: InputTextProps) => {
    return (
        <div className={styles.inputText}>
            <label className={styles.label}>{label}</label>
            <input
                className={msgError === "Bad username or password !" ||(!value && msgError) ? styles.error : ''}
                type={inputType}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default InputText