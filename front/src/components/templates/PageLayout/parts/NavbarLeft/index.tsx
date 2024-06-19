import styles from './styles.module.scss'

/* components */
import Header from '../Header'
import InputSearch from '../../../../molecules/InputSearch'
import { useState } from 'react'
import MenuSelection from '../MenuSelection'
import Avatar from '../../../../atoms/Avatar'

const NavbarLeft = () => {
  const [searchContact, setSearchContact] = useState<string>('')

  const handleSearchContact = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchContact(e.target.value)
  }

  return (
    <div className={styles.navbar_left}>
      <Header />
      <InputSearch
        placeholder="Search"
        value={searchContact}
        onChange={handleSearchContact}
      />
      <MenuSelection />
      <div className={styles.contact_list}>
        <span className={styles.date}>Today</span>
        <ul className={styles.list}>
          <li>
            <Avatar />
            <div className={styles.infos}>
              <span>Pierre</span>
              <span>Online</span>
            </div>
          </li>
          <li>
            <Avatar />
            <div className={styles.infos}>
              <span>Mattéo</span>
              <span>Online</span>
            </div>
          </li>
          <li>
            <Avatar status={"away"}/>
            <div className={styles.infos}>
              <span>Floflo</span>
              <span>Away</span>
            </div>
          </li>
          <li>
            <Avatar status={"nodisturb"}/>
            <div className={styles.infos}>
              <span>Louis</span>
              <span>No disturbing</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NavbarLeft
