import styles from './styles.module.scss'


type InputTextProps = {
    label: string
    inputType: 'text' | 'password'
    placeholder: string
    name: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputText = ({label, inputType, placeholder, name, value, onChange }: InputTextProps) => {
    return (
        <div>
            <label className={styles.label}>{label}</label>
            <input
                className={styles.input}
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