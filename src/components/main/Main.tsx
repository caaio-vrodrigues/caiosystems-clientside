import { Description } from './description/Description';
import styles from './Main.module.css';
import { Welcome } from './welcome/Welcome';

export const Main = () => 
  <main className={styles.main}>
    <Welcome/>
    <Description/>
  </main>