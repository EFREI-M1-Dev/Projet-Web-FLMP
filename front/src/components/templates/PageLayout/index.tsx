import styles from './styles.module.scss'

/* components */
import NavbarLeft from './parts/NavbarLeft'
import { useAppSelector } from '../../../hooks/reduxHooks'

type PageLayoutProps = {
  children: React.ReactNode
}

const Pagelayout = ({ children }: PageLayoutProps) => {
  const token = useAppSelector((state) => state.user?.token)

  return (
    <div className={token && styles.page_layout}>
      {token && <NavbarLeft />}
      {children}
    </div>
  )
}

export default Pagelayout
