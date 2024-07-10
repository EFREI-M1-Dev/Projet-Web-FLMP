import styles from './styles.module.scss'

/* components */
import Icon from '../../atoms/Icon'

type InputSearchProps = {
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputSearch = ({ placeholder, value, onChange }: InputSearchProps) => {
  return (
    <div className={styles.input_search}>
      <Icon name="search" size="medium" color="#0B9CD5" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default InputSearch
