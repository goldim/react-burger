import { Button, EmailInput, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/middleware/auth';

import "./styles.css"

const ForgotPasswordPage = () => {
  const reduxDispatch = useDispatch();
  const resetSuccess = useSelector(store => store.authReducer.resetSuccess);
  const navigate = useNavigate();

  useEffect(() => {
    if (resetSuccess){
      navigate('/reset-password');
    }
  }, [resetSuccess, navigate]);

  const [email, setEmail] = useState();
  const onChangeEmail = e => {
    setEmail(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    reduxDispatch(resetPassword(email))
  }

  return (
    <div>
        <p><Link to="/"><Logo/></Link></p>
        <p>Восстановление пароля</p>
        <form onSubmit={onSubmit}>
          <EmailInput placeholder="e-mail" name="email" value={email} onChange={onChangeEmail}/>
          <Button type="primary" size="medium">Восстановить</Button>
        </form>
        <p>Вспомнили пароль? <Link to="/login">Войти</Link></p>
    </div>
  );
}

export default ForgotPasswordPage;