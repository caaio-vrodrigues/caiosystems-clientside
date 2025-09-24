import { Contact } from './contact/Contact';
import { Description } from './description/Description';
import { Specialties } from './specialties/Specialties';
import { Welcome } from './welcome/Welcome';
import styles from './Main.module.css';

export const Main = () => 
  <main className={styles.main}>
    <Welcome/>
    <Description/>
    <Specialties/>
    <Contact/>
  </main>