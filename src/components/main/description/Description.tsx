import { Card } from './card/Card';
import { cardInfos, workSummary } from '@/data/descriptionData';
import styles from './Description.module.css';

export const Description = () =>
  <section className={`${styles.secDescription}`}>
    <h1>Descrição</h1>
    <div className={styles.cardsContainer}>
      <div className={`${styles.wrapCards} ${styles.leftWrapCards}`}>
        {cardInfos.map(infos => 
          <Card 
            key={infos.id}
            text={infos.text}
            link={infos.link}
            linkTxt={infos.linkTxt}/>)}
      </div>
      <div className={`${styles.wrapCards} ${styles.rightWrapCard}`}>
        <h2>Breve resumo sobre meu trabalho</h2>
        <p>{workSummary}</p>
      </div>
    </div>
  </section>