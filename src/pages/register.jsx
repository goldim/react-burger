import { Button, Input, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerNewUser } from '../services/middleware/auth';

const RegisterPage = (props) => {
  const reduxDispatch = useDispatch();
  const name = useSelector(store => store.authReducer.currentUser.name);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (name){
      navigate('/');
    }
  }, [name, navigate]);

  const onRegister = () => {
    const name = nameRef.current.value;
    const password = passwordRef.current.value;
    const email = emailRef.current.value;
    reduxDispatch(registerNewUser(name, password, email))
  }

  return (
    <div>
        <p><Logo/></p>
        <p>Регистрация</p>
        <Input type="text" placeholder="Имя" ref={nameRef}/>
        <Input type="email" placeholder="e-mail" ref={emailRef}/>
        <Input type="password" placeholder="Пароль" icon="ShowIcon" ref={passwordRef}/>
        <Button type="primary" size="medium" onClick={onRegister}>
          Зарегистрироваться
        </Button>
        <p>Уже зарегистрированы? <Link to="/login">Войти</Link></p>
    </div>
  );
}

export default RegisterPage;