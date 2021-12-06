import { Button, Input, Logo, PasswordInput } from '../utils/yandex-components';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { savePassword } from '../services/middleware/auth';

import "./styles.css"

const ResetPasswordPage = () => {
  const reduxDispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const savePasswordSuccess = useSelector((store: any) => store.authReducer.savePasswordSuccess);

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
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const [token, setToken] = useState("");
  const onChangeToken = (e: ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    reduxDispatch(savePassword(password, token))
  }

  return (
    <div>
        <p><Link to="/"><Logo/></Link></p>
        <p>Восстановление пароля</p>
        <form onSubmit={onSubmit}>
          <PasswordInput name="password" onChange={onChangePassword} value={password}/>
          <Input type="text" placeholder="Введите код из письма" onChange={onChangeToken} value={token}/>
          <p className="centered">
            <Button type="primary" size="medium">
              Сохранить
            </Button>
          </p>
        </form>
        <p className="centered">Вспомнили пароль? <Link to="/login">Войти</Link></p>
    </div>
  );
}

export default ResetPasswordPage;