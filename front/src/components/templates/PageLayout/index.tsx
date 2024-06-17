import ContactList from './parts/ContactList';
import Header from './parts/Header';
import styles from './styles.module.scss';

type PageLayoutProps = {
  children: React.ReactNode;
};

const Pagelayout = ({ children }: PageLayoutProps) => {
  return (
    <div className={styles.page_layout}>
      <div>
        <Header />
        <ContactList />
      </div>
      {children}
    </div>
  );
};

export default Pagelayout;
