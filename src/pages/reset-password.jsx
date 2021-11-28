import { Button, Input, Logo, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { savePassword } from '../services/middleware/auth';

import "./styles.css"

const ResetPasswordPage = () => {
  const reduxDispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const savePasswordSuccess = useSelector(store => store.authReducer.savePasswordSuccess);

  useEffect(() => {
    if (!location.state || !location.state.forgotPassed){
      navigate(-1);
    } else {
      if (savePasswordSuccess){
        navigate('/login', {state: {resetPassed: true}});
      }
    }
  }, [savePasswordSuccess, navigate, location.state]);

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

  return (
    <div>
        <p><Link to="/"><Logo/></Link></p>
        <p>Восстановление пароля</p>
        <form onSubmit={onSubmit}>
          <PasswordInput placeholder="Введите новый пароль" onChange={onChangePassword} value={password}/>
          <Input type="text" placeholder="Введите код из письма" onChange={onChangeToken} value={token}/>
          <center>
            <Button type="primary" size="medium">
              Сохранить
            </Button>
          </center>
        </form>
        <center><p>Вспомнили пароль? <Link to="/login">Войти</Link></p></center>
    </div>
  );
}

export default ResetPasswordPage;