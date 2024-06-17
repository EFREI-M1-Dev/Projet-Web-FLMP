import Avatar from '../../../../atoms/Avatar';
import styles from './styles.module.scss';

const Header = () => {
  return (
    <div className={styles.header}>
      <Avatar />
      <span>Header</span>
    </div>
  );
};

export default Header;
