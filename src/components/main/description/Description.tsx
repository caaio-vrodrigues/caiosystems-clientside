import styles from './Description.module.css';

export const Description = () =>
  <section className={`${styles.secDescription}`}>
    <h1>Descrição</h1>
    <div className={styles.cardsContainer}>
      <div className={`${styles.wrapCards} ${styles.leftWrapCards}`}>
        <article className={`${styles.card}`}>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, ut!</p>
        </article>
      </div>
      <div className={`${styles.wrapCards} ${styles.rightWrapCard}`}>
        <h2>Breve resumo sobre meu trabalho</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, iure.</p>
      </div>
    </div>
  </section>