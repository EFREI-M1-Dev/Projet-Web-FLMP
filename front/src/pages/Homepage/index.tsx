import styles from "./styles.module.scss";
import {IconHomeNews} from "../../components/atoms/Icons/IconHomeSvg.tsx";
import {IconMeetHome} from "../../components/atoms/Icons/IconMeetHome.tsx";

const Homepage = () => {
  return (
      <main className={styles.hp}>
        <section className={styles.hp__wrapper}>
          <section className={styles.hp__head}>
            <div className={styles.hp__head__img}>
              <img src="https://www.aussitot.fr/wp-content/uploads/2006/05/skype-avatar.png" alt="Logo 100"/>
              <div className={styles.hp__head__title}>
                <h1>
                  Welcome!
                </h1>
                <p>
                  Florent Parigo
                </p>
              </div>
            </div>
            <div className={styles.hp__head__btn}>
              <button className={styles.button}>
                Share profile
              </button>
            </div>
          </section>
          <p className={styles.hp__desc}>
            Here are some quick actions to get you started
          </p>
          <section className={styles.hp__cards}>
            <div className={styles.hp__cards__card}>
              <IconHomeNews/>
              <h2>What's news in Skype</h2>
              <p>
                Stay up to date with the latest features, news, and updates from Skype. Don't miss a thing.
              </p>
              <button className={styles.button__reverse}>Learn more</button>
            </div>
            <div className={styles.hp__cards__card}>
              <IconMeetHome/>
              <h2>Easy meetings with anyone</h2>
              <p>
                Share the invite with anyone even if they aren't on Skype. No signups or downloads required.
              </p>
              <button className={styles.button__reverse}>
                Meet now
              </button>
            </div>
          </section>
          <section className={styles.hp__bottom}>
            <p>
              You need some help ?
              Go fuck yourself.
            </p>
            <a href="#" className={styles.hp__bottom__link}>
              Learn more
            </a>
          </section>
        </section>
      </main>
  );
};

export default Homepage;
