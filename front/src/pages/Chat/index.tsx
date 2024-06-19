import styles from './styles.module.scss'

import Avatar from "../../components/atoms/Avatar";
import Icon from "../../components/atoms/Icon";

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
            <button className={styles.button}>
              <Icon name='phone'/>
            </button>
            <button className={styles.button}>
              <Icon name='video' color='#fff' />
            </button>
          </div>
        </header>

        <section className={styles.chat__content}>
          <div className={`${styles.chat__message} ${styles.message__left}`}>
            <div className={styles.chat__message__avatar}>
              <Avatar displayStatus={false}/>
            </div>
            <div className={styles.chat__message__text}>
              <p>
                Hello, how are you?
              </p>
            </div>
            <div className={styles.chat__message__date}>
              12:00 AM
            </div>
          </div>
          <div className={`${styles.chat__message} ${styles.message__left}`}>
            <div className={styles.chat__message__avatar}>
              <Avatar displayStatus={false}/>
            </div>
            <div className={styles.chat__message__text}>
              <p>
                I'm busy rn
              </p>
            </div>
            <div className={styles.chat__message__date}>
              12:01 AM
            </div>
          </div>

          <div className={`${styles.chat__message} ${styles.message__right}`}>
            <div className={styles.chat__message__text}>
              <p>
                Can I ask you something ?
              </p>
            </div>
            <div className={styles.chat__message__date}>
              12:05 AM
            </div>
          </div>

          <div className={`${styles.chat__message} ${styles.message__left}`}>
            <div className={styles.chat__message__avatar}>
              <Avatar displayStatus={false}/>
            </div>
            <div className={styles.chat__message__text}>
              <p>
                Sure
              </p>
            </div>
            <div className={styles.chat__message__date}>
              12:10 AM
            </div>
          </div>

          <div className={`${styles.chat__message} ${styles.message__right}`}>
            <div className={styles.chat__message__text}>
              <p>
                Can you help me with my homework?
              </p>
            </div>
            <div className={styles.chat__message__date}>
              12:39 AM
            </div>
          </div>
        </section>

        <footer className={styles.chat__footer}>
          <div className={styles.chat__footer__content}>
            <label htmlFor='text' className={styles.chat__footer__label}>
              via&nbsp;
              <span>
                Skype
                <Icon name="arrowBottom"/>
              </span>
            </label>
            <div className={styles.chat__footer__input}>
              <div>
                <input type="text" name='submitText' id='text'/>
                <div>
                  <Icon name='emote'/>
                </div>
              </div>
              <button>
                <Icon name='send'/>
              </button>
            </div>
            <label htmlFor='text' className={styles.chat__footer__icons}>
              <Icon name='camera' />
              <Icon name='video' color='#0B9CD5'/>
              <Icon name='upload' />
              <Icon name='user' />
            </label>
          </div>
        </footer>
      </main>
  );
};

export default Chat;
