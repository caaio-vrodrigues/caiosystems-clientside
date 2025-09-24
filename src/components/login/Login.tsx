import { BottomSec } from './bottom-sec/BottomSec';
import { Form } from './form/Form';
import { TopSec } from './top-sec/TopSec';
import styles from './Login.module.css';

export const Login = () => {
  return(
    <div className={styles.loginContainer}>
      <TopSec/>
      <Form/>
      <BottomSec/>
    </div>
  );
};