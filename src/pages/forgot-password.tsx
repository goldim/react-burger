import { Button, EmailInput, Logo } from '../utils/yandex-components';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/middleware/auth';

import styles from "./common.module.css";
import { useDispatch, useSelector } from '../services/hooks';

const ForgotPasswordPage = () => {
  const reduxDispatch = useDispatch();
  const resetSuccess = useSelector(store => store.authReducer.resetSuccess);
  const navigate = useNavigate();

  useEffect(() => {
    if (resetSuccess){
      navigate('/reset-password', {state: { forgotPassed: true}});
    }
  }, [resetSuccess, navigate]);

  const [email, setEmail] = useState<string>("");
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    reduxDispatch(resetPassword(email))
  }

  return (
    <div>
        <p><Link to="/"><Logo/></Link></p>
        <p>Восстановление пароля</p>
        <form onSubmit={onSubmit} className={styles.formContainer}>
          <EmailInput name="email" value={email} onChange={onChangeEmail}/>
          <p className={styles.centered}><Button type="primary" size="medium">Восстановить</Button></p>
        </form>
        <p className={styles.centered}>Вспомнили пароль? <Link to="/login">Войти</Link></p>
    </div>
  );
}

export default ForgotPasswordPage;