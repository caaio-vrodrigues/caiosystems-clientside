import styles from './Login.module.css';
import { TopSec } from './TopSec/TopSec';

export const Login = () => {
  return(
    <div className={styles.loginContainer}>
      <TopSec/>
      Hello Login
    </div>
  );
};