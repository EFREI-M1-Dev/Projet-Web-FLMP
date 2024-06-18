import styles from './styles.module.scss'

/* components */
import Header from '../Header'
import InputSearch from '../../../../molecules/InputSearch'
import { useState } from 'react'
import MenuSelection from '../MenuSelection'

const ContactList = () => {
  const [searchContact, setSearchContact] = useState<string>('')

  const handleSearchContact = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchContact(e.target.value)
  }

  return (
    <div className={styles.contact_list}>
      <Header />
      <InputSearch
        placeholder="Search"
        value={searchContact}
        onChange={handleSearchContact}
      />
      <MenuSelection />
      <span>Contact List</span>
    </div>
  )
}

export default ContactList
