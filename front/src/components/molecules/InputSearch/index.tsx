import Icon from '../../atoms/Icon'
import styles from './styles.module.scss'

type InputSearchProps = {
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputSearch = ({ placeholder, value, onChange }: InputSearchProps) => {
  return (
    <div className={styles.input_search}>
      <Icon name="search" size="small" color="#cecece" />
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
