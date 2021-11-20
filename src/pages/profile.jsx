import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import PageWithAppHeader from '../components/page-with-app-header';
import { updateProfile } from '../services/middleware/auth';

const NavList = () => {
  return (
    <section>
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
    </section>
  );
}

const ProfilePage = () => {
  const { name, password, email } = useSelector(store => store.authReducer.currentUser);

  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);

  useEffect(() => {
    onCancel();
  }, []);

  const onCancel = () => {
    nameRef.current.value = name;
    emailRef.current.value = email;
    passwordRef.current.value = password;
  }

  const reduxDispatch = useDispatch();

  const onSaveProfile = () => {
    reduxDispatch(updateProfile(nameRef.current.value, emailRef.current.value, passwordRef.current.value));
  }

  return (
    <>
      <PageWithAppHeader>
        <NavList/>
        <aside>
          <Input type="text" placeholder="Имя" icon="EditIcon" ref={nameRef}/>
          <Input type="email" placeholder="e-mail" icon="EditIcon" ref={emailRef}/>
          <Input type="password" placeholder="Пароль" icon="EditIcon" ref={passwordRef}/>
          <Button type="secondary" size="medium" onClick={onCancel}>Отмена</Button>
          <Button type="primary" size="medium" onClick={onSaveProfile}>Сохранить</Button>
        </aside>
      </PageWithAppHeader>
      <footer align="center">
        <p>В этом разделе вы можете изменить ваши персональные данные</p>
      </footer>
    </>
  )
};

export default ProfilePage;