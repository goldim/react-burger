import { Button, EmailInput, Logo, PasswordInput } from '../utils/yandex-components';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/auth';

import styles from './common.module.css';

const LoginPage = () => {
  const {signIn} = useAuth();

  const [password, setPassword] = useState("");
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const [email, setEmail] = useState("");
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const navigate = useNavigate();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    signIn(email, password).then(function(){
      navigate(-1);
    });
  }

  return (
    <div>
      <p><Link to="/"><Logo/></Link></p>
      <p>Вход</p>
      <form onSubmit={onSubmit} className={styles.formContainer}>
        <EmailInput name="email" value={email} onChange={onChangeEmail}/>
        <PasswordInput name="password" value={password} onChange={onChangePassword}/>
        <Button type="primary" size="medium">
          Войти
        </Button>
      </form>
      <p>Вы - новый пользователь? <Link to="/register">Зарегистрироваться</Link></p>
      <p>Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link></p>
    </div>
  );
}

export default LoginPage;