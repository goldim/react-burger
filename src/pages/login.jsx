import { Button, EmailInput, Logo, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/middleware/auth';

const LoginPage = () => {
  const navigate = useNavigate();
  const name = useSelector(store => store.authReducer.currentUser.name);
  
  useEffect(() => {
    if (name){
      navigate("/");
    }
  }, [name, navigate]);

  const reduxDispatch = useDispatch();

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
    reduxDispatch(login(email, password));
  }

  return (
    <div>
      <p><Link to="/"><Logo/></Link></p>
      <p>Вход</p>
      <form onSubmit={onSubmit}>
        <EmailInput placeholder="e-mail" value={email} onChange={onChangeEmail}/>
        <PasswordInput placeholder="Пароль" value={password} onChange={onChangePassword}/>
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