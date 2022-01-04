import { Button, EmailInput, Input, Logo, PasswordInput } from '../utils/yandex-components';
import { ChangeEvent, FormEvent, useEffect, useState,  } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerNewUser } from '../services/middleware/auth';

import "./styles.css"
import { TRootState } from '../services/types';
import { useDispatch, useSelector } from '../services/hooks';

const RegisterPage = () => {
  const reduxDispatch = useDispatch();
  const savedName = useSelector((store: TRootState) => store.authReducer.currentUser.name);
  const navigate = useNavigate();

  useEffect(() => {
    if (savedName){
      navigate('/');
    }
  }, [savedName, navigate]);

  const [name, setName] = useState("");
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const [password, setPassword] = useState("");
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const [email, setEmail] = useState("");
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    reduxDispatch(registerNewUser(name, password, email))
  }

  return (
    <div>
        <p><Link to="/"><Logo/></Link></p>
        <p>Регистрация</p>
        <form onSubmit={onSubmit}>
          <Input type="text" placeholder="Имя" onChange={onChangeName} value={name}/>
          <EmailInput name="email" onChange={onChangeEmail} value={email}/>
          <PasswordInput name="password" onChange={onChangePassword} value={password}/>
          <p className="centered">
            <Button type="primary" size="medium">
              Зарегистрироваться
            </Button>
          </p>
        </form>
        <p className="centered">Уже зарегистрированы? <Link to="/login">Войти</Link></p>
    </div>
  );
}

export default RegisterPage;