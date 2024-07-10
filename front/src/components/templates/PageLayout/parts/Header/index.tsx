import Avatar from '../../../../atoms/Avatar'
import styles from './styles.module.scss'

import cloudTop from '../../../../../assets/img/cloud-top-bar.svg'
import { useGetUserQuery } from '../../../../../generated/graphql'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../../../hooks/reduxHooks'
import { logoutLoggedUser } from '../../../../../features/userConnected'
import Button from '../../../../atoms/Button'

const Header = () => {
  const [user, setUser] = useState<string>('')
  const [showMenu, setShowMenu] = useState<boolean>(false)

  const { loading, data } = useGetUserQuery({})

  useEffect(() => {
    if (!loading && data?.getUser) {
      setUser(data?.getUser?.username)
    }
  }, [data])

  const handleShowMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <div className={styles.header} onClick={handleShowMenu}>
      <img className={styles.cloud} src={cloudTop} />
      <Avatar />
      <div className={styles.infos_user}>
        <span>{user}</span>
        <span>Online</span>
      </div>
      {showMenu && <Menu />}
    </div>
  )
}

const Menu = () => {
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logoutLoggedUser())
  }

  return (
    <div className={styles.menu}>
      <Button onClick={handleLogout}>Disconnect</Button>
    </div>
  )
}

export default Header
