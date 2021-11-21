import { Button, Input, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/middleware/auth';

const ForgotPasswordPage = () => {
  const reduxDispatch = useDispatch();
  const emailRef = useRef(null);
  const resetSuccess = useSelector(store => store.authReducer.resetSuccess);

  const onResetPassword = () => {
    reduxDispatch(resetPassword(emailRef.current.value))
  }

  const navigate = useNavigate();

  useEffect(() => {
    console.log(resetSuccess);
    if (resetSuccess){
      navigate('/reset-password');
    }
  }, [resetSuccess, navigate]);

  return (
    <div>
        <p><Logo/></p>
        <p>Восстановление пароля</p>
        <Input type="email" placeholder="e-mail" ref={emailRef}/>
        <Button type="primary" size="medium" onClick={onResetPassword}>Восстановить</Button>
        <p>Вспомнили пароль? <Link to="/login">Войти</Link></p>
    </div>
  );
}

export default ForgotPasswordPage;