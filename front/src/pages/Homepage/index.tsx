import styles from "./styles.module.scss";
import {IconHomeNews} from "../../components/atoms/Icons/IconHomeSvg.tsx";
import {IconMeetHome} from "../../components/atoms/Icons/IconMeetHome.tsx";

const Homepage = () => {
  return (
      <main className={styles.hp}>
        <section className={styles.hp__head}>
          <div className={styles.hp__head__img}>
            <img src="https://via.placeholder.com/150x150" alt="Logo 100"/>
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
              Partager mon profil
            </button>
          </div>
        </section>
        <p className={styles.hp__desc}>
          Voici quelques actions rapides pour vous aider à manipuler Skipe
        </p>
        <section className={styles.hp__cards}>
          <div className={styles.hp__cards__card}>
            <IconHomeNews/>
            <h2>Les nouveautés</h2>
            <p>
              Restez informé des dernières fonctionnalités et mises à jour de Skype. Ne manquez rien !
            </p>
            <button className={styles.button__reverse}>En savoir plus</button>
          </div>
          <div className={styles.hp__cards__card}>
            <IconMeetHome/>
            <h2>Des rencontres faciles avec n'importe qui</h2>
            <p>
              Partagez l'invitation avec n'importe qui, même s'il n'est pas sur Skype. Aucune inscription ni aucun téléchargement n'est nécessaire.
            </p>
            <button className={styles.button__reverse}>
              Rencontrer maintenant
            </button>
          </div>
        </section>
        <section className={styles.hp__bottom}>
          <p>
            Vous avez besoin d'aide ?
            Allez vous faire foutre.
          </p>
          <a href="#" className={styles.hp__bottom__link}>
            En savoir plus
          </a>
        </section>
      </main>
  );
};

export default Homepage;
