import styles from './styles.module.scss'

/* components */
import NavbarLeft from './parts/NavbarLeft'

type PageLayoutProps = {
  children: React.ReactNode
}

const Pagelayout = ({ children }: PageLayoutProps) => {
  return (
    <div className={styles.page_layout}>
      <NavbarLeft />
      {children}
    </div>
  )
}

export default Pagelayout
