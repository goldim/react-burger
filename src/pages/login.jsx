import { Button, Input, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/middleware/auth';

const LoginPage = (props) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();
  const name = useSelector(store => store.authReducer.currentUser.name);
  
  useEffect(() => {
    if (name){
      navigate("/");
    }
  }, [name, navigate]);

  const reduxDispatch = useDispatch();

  const onLogin = () => {
    reduxDispatch(login(emailRef.current.value, passwordRef.current.value));
  };

  return (
    <div>
      <p><Logo/></p>
      <p>Вход</p>
      <Input type="email" placeholder="e-mail" ref={emailRef}/>
      <Input type="password" placeholder="Пароль" ref={passwordRef}/>
      <Button type="primary" size="medium" onClick={onLogin}>
        Войти
      </Button>
      <p>Вы - новый пользователь? <Link to="/register">Зарегистрироваться</Link></p>
      <p>Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link></p>
    </div>
  );
}

export default LoginPage;