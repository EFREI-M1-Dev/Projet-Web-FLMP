import styles from './styles.module.scss'

/* components */
import ContactList from './parts/ContactList'

type PageLayoutProps = {
  children: React.ReactNode
}

const Pagelayout = ({ children }: PageLayoutProps) => {
  return (
    <div className={styles.page_layout}>
      <ContactList />
      {children}
    </div>
  )
}

export default Pagelayout
