import { Button, Input, Logo, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { savePassword } from '../services/middleware/auth';

const ResetPasswordPage = () => {
  const reduxDispatch = useDispatch();
  const savePasswordSuccess = useSelector(store => store.authReducer.savePasswordSuccess);

  const [password, setPassword] = useState("");
  const onChangePassword = e => {
    setPassword(e.target.value)
  }

  const [token, setToken] = useState("");
  const onChangeToken = e => {
    setToken(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    reduxDispatch(savePassword(password, token))
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (savePasswordSuccess){
      navigate('/profile');
    }
  }, [savePasswordSuccess, navigate]);

  return (
    <div>
        <p><Link to="/"><Logo/></Link></p>
        <p>Восстановление пароля</p>
        <form onSubmit={onSubmit}>
          <PasswordInput placeholder="Введите новый пароль" onChange={onChangePassword} value={password}/>
          <Input type="text" placeholder="Введите код из письма" onChange={onChangeToken} value={token}/>
          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </form>
        <p>Вспомнили пароль? <Link to="/login">Войти</Link></p>
    </div>
  );
}

export default ResetPasswordPage;