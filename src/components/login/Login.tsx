import { BottomSec } from './bottom-sec/BottomSec';
import styles from './Login.module.css';
import { TopSec } from './top-sec/TopSec';

export const Login = () => {
  return(
    <div className={styles.loginContainer}>
      <TopSec/>
      <div className={styles.form}>Formulário</div>
      <BottomSec/>
    </div>
  );
};