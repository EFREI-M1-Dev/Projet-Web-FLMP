import styles from './styles.module.scss'

import Avatar from "../../components/atoms/Avatar";

const Chat = () => {
  return (
    <main className={styles.chat}>
      <header className={styles.chat__header}>
        <div className={styles.chat__header__infos}>
          <div>
            <Avatar/>
          </div>
          <div>
            <h1>
              Florent Parigo
            </h1>
            <p>
              Online
            </p>
          </div>
        </div>
        <div className={styles.chat__header__actions}>

        </div>
      </header>

      <section className={styles.chat__content}>

      </section>

      <footer className={styles.chat__footer}>

      </footer>
    </main>
  );
};

export default Chat;
