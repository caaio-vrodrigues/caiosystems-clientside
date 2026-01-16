import styles from './Welcome.module.css';

export const Welcome = () => 
  <section>
    <div className={styles.welcome}>
      <span className={styles.spanOla}>Olá.</span>
      <span>Seja muito bem vindo!</span>
    </div>
    <div className={styles.videoBlock}>
      <iframe
        src='https://www.youtube.com/embed/IkoLuh03t6I'
        title='Apresentação: Seja bem-vindo'
        loading='lazy'
        referrerPolicy='strict-origin-when-cross-origin'
        allow={`accelerometer; autoplay; clipboard-write; encrypted-media;
          gyroscope; picture-in-picture; web-share`}
        frameBorder='0'
        allowFullScreen />
    </div>
  </section>