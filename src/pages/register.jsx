import { Button, EmailInput, Input, Logo, PasswordInput } from '../utils/yandex-components';
import { useEffect, useState,  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerNewUser } from '../services/middleware/auth';

import "./styles.css"

const RegisterPage = () => {
  const reduxDispatch = useDispatch();
  const savedName = useSelector(store => store.authReducer.currentUser.name);
  const navigate = useNavigate();

  useEffect(() => {
    if (savedName){
      navigate('/');
    }
  }, [savedName, navigate]);

  const [name, setName] = useState("");
  const onChangeName = e => {
    setName(e.target.value)
  }

  const [password, setPassword] = useState("");
  const onChangePassword = e => {
    setPassword(e.target.value)
  }

  const [email, setEmail] = useState("");
  const onChangeEmail = e => {
    setEmail(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    reduxDispatch(registerNewUser(name, password, email))
  }

  return (
    <div>
        <p><Link to="/"><Logo/></Link></p>
        <p>Регистрация</p>
        <form onSubmit={onSubmit}>
          <Input type="text" placeholder="Имя" onChange={onChangeName} value={name}/>
          <EmailInput placeholder="e-mail" onChange={onChangeEmail} value={email}/>
          <PasswordInput placeholder="Пароль" onChange={onChangePassword} value={password}/>
          <Button type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </form>
        <p>Уже зарегистрированы? <Link to="/login">Войти</Link></p>
    </div>
  );
}

export default RegisterPage;