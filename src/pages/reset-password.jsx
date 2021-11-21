import { Button, Input, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { savePassword } from '../services/middleware/auth';

const ResetPasswordPage = (props) => {
  const reduxDispatch = useDispatch();
  const tokenRef = useRef(null);
  const passwordRef = useRef(null);
  const savePasswordSuccess = useSelector(store => store.authReducer.savePasswordSuccess);

  const onSavePassword = () => {
    reduxDispatch(savePassword(passwordRef.current.value, tokenRef.current.value))
  }

  const navigate = useNavigate();

  useEffect(() => {
    console.log(savePasswordSuccess);
    if (savePasswordSuccess){
      navigate('/profile');
    }
  }, [savePasswordSuccess, navigate]);

  return (
    <div>
        <p><Link to="/"><Logo/></Link></p>
        <p>Восстановление пароля</p>
        <Input type="password" placeholder="Введите новый пароль" icon="ShowIcon" ref={passwordRef}/>
        <Input type="text" placeholder="Введите код из письма" ref={tokenRef}/>
        <Button type="primary" size="medium" onClick={onSavePassword}>
          Сохранить
        </Button>
        <p>Вспомнили пароль? <Link to="/login">Войти</Link></p>
    </div>
  );
}

export default ResetPasswordPage;