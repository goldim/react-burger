import { Button, EmailInput, Logo } from '../utils/yandex-components';
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
      navigate('/reset-password', {state: { forgotPassed: true}});
    }
  }, [resetSuccess, navigate]);

  const [email, setEmail] = useState("");
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
          <EmailInput placeholder="e-mail" value={email} onChange={onChangeEmail}/>
          <center><Button type="primary" size="medium">Восстановить</Button></center>
        </form>
        <center><p>Вспомнили пароль? <Link to="/login">Войти</Link></p></center>
    </div>
  );
}

export default ForgotPasswordPage;