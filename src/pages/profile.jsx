import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import PageWithAppHeader from '../components/page-with-app-header';

const NavList = () => (
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
);

const ProfilePage = (props) => (
  <>
    <PageWithAppHeader>
      <NavList/>
      <aside>
        <Input type="text" placeholder="Имя" value="Dmitry"/>
        <Input type="email" placeholder="e-mail" value="zolotovdy@yandex.ru"/>
        <Input type="password" placeholder="Пароль" icon="ShowIcon" value="1111"/>
      </aside>
    </PageWithAppHeader>
    <footer align="center">
      <p>В этом разделе вы можете изменить ваши персональные данные</p>
    </footer>
  </>
);

export default ProfilePage;