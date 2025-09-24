import { BottomSec } from './bottom-sec/BottomSec';
import { Form } from './form/Form';
import { TopSec } from './top-sec/TopSec';
import styles from './Login.module.css';
import { NewAccount } from './new-account/NewAccount';

export const Login = () => {
  return(
    <div className={styles.loginContainer}>
      <TopSec/>
      <NewAccount/>
      <Form/>
      <BottomSec/>
    </div>
  );
};