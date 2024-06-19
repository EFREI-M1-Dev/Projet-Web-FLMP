import styles from './styles.module.scss'
import { Outlet } from 'react-router'

/* components */
import NavbarLeft from './parts/NavbarLeft'
import { useAppSelector } from '../../../hooks/reduxHooks'

const Pagelayout = () => {
  const token = useAppSelector((state) => state.user?.token)

  return (
    <div className={token && styles.page_layout}>
      {token && <NavbarLeft />}
      <Outlet />
    </div>
  )
}

export default Pagelayout
