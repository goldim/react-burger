import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import AppHeader from '../components/app-header/app-header';

const ProfilePage = (props) => {
  return (
    <div>
        <AppHeader/>
        <main>
          <section>
            <ul>
              <li>
                <Link to="/profile">Профиль</Link>
              </li>
              <li>
                <Link to="/profile/orders">История заказов</Link>
              </li>
              <li>
                <Link to="/">Выйти</Link>
              </li>
            </ul>
          </section>
          <aside>
            <Input type="text" placeholder="Имя" value="Dmitry"/>
            <Input type="email" placeholder="e-mail" value="zolotovdy@yandex.ru"/>
            <Input type="password" placeholder="Пароль" icon="ShowIcon" value="1111"/>
          </aside>
        </main>
        <footer align="center">
          <p>В этом разделе вы можете изменить ваши персональные данные</p>
        </footer>
    </div>
  );
}

export default ProfilePage;