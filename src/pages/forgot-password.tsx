import { Button, EmailInput, Logo } from '../utils/yandex-components';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/middleware/auth';

import "./styles.css";

const ForgotPasswordPage = () => {
  const reduxDispatch = useDispatch();
  const resetSuccess = useSelector((store: any) => store.authReducer.resetSuccess);
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
        <form onSubmit={onSubmit}>
          <EmailInput name="email" value={email} onChange={onChangeEmail}/>
          <p className="centered"><Button type="primary" size="medium">Восстановить</Button></p>
        </form>
        <p className="centered">Вспомнили пароль? <Link to="/login">Войти</Link></p>
    </div>
  );
}

export default ForgotPasswordPage;