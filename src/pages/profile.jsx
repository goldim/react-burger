import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfile, updateProfile } from '../services/middleware/auth';

import "./styles.css"
import "./profile.css"

const NavList = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/profile" style={{ textDecoration: 'none', color: "white" }}>
            <p className="text text_type_main-default">Профиль</p>
          </Link>
        </li>
        <li>
          <Link to="/profile/orders" style={{ textDecoration: 'none' }}>
            <p className="text text_type_main-default text_color_inactive">История заказов</p>
          </Link>
        </li>
        <li>
          <Link to="/logout"  style={{ textDecoration: 'none' }}>
            <p className="text text_type_main-default text_color_inactive">Выйти</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}

const ProfilePage = () => {
  const { name: savedName, email: savedEmail } = useSelector(store => store.authReducer.currentUser);
  const reduxDispatch = useDispatch();

  const [name, setName] = useState(savedName);
  const onChangeName = e => {
    setName(e.target.value)
  }

  const [password, setPassword] = useState("");
  const onChangePassword = e => {
    setPassword(e.target.value)
  }

  const [email, setEmail] = useState(savedEmail);
  const onChangeEmail = e => {
    setEmail(e.target.value)
  }

  const setupFields = useCallback(() => {
    setName(name);
    setPassword(password);
    setEmail(email);
  }, [name, password, email])
  
  const resetFields = useCallback(() => {
    setName(savedName);
    setPassword(password);
    setEmail(savedEmail);
  }, [savedName, password, savedEmail])

  const onCancel = useCallback((e) => {
    e.preventDefault();
    resetFields();
  }, [resetFields]);

  useEffect(() => {
    reduxDispatch(getProfile());
    setupFields();
    // eslint-disable-next-line
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    reduxDispatch(updateProfile(name, password, email));
  }

  return (
    <>
      <div className="mystyle">
        <NavList/>
        <div>
          <form onSubmit={onSubmit}>
            <Input type="text" placeholder="Имя" icon="EditIcon" onChange={onChangeName} value={name}/>
            <Input type="email" placeholder="e-mail" icon="EditIcon" onChange={onChangeEmail} value={email}/>
            <Input type="password" placeholder="Пароль" icon="EditIcon" onChange={onChangePassword} value={password}/>
            <Button type="secondary" size="medium" onClick={onCancel}>Отмена</Button>
            <Button type="primary" size="medium">Сохранить</Button>
          </form>
        </div>
        <div>
          <p className="text text_color_inactive">В этом разделе вы можете изменить ваши персональные данные</p>
        </div> 
      </div>
    </>
  )
};

export default ProfilePage;