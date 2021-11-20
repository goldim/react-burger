import { Button, Input, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import PageWithAppHeader from '../components/page-with-app-header';
import { resetPassword } from '../services/middleware/auth';

const ForgotPasswordPage = () => {
  const reduxDispatch = useDispatch();
  const emailRef = useRef(null);
  const resetSuccess = useSelector(store => store.authReducer.resetSuccess);

  const onResetPassword = () => {
    console.log(emailRef.current.value);
    reduxDispatch(resetPassword(emailRef.current.value))
  }

  const navigate = useNavigate();

  useEffect(() => {
    console.log(resetSuccess);
    if (resetSuccess){
      navigate('/reset-password', { replace: true });
    }
  }, [resetSuccess, navigate]);

  return (
      <PageWithAppHeader>
        <div>
            <p><Logo/></p>
            <p>Восстановление пароля</p>
            <Input type="email" placeholder="e-mail" ref={emailRef} value="hello@yandex.ru" onChange={(e) => console.log(e)}/>
            <Button type="primary" size="medium" onClick={onResetPassword}>Восстановить</Button>
            <p>Вспомнили пароль? <Link to="/login">Войти</Link></p>
        </div>
      </PageWithAppHeader>
  );
}

export default ForgotPasswordPage;