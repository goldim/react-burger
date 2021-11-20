import { Button, Input, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import PageWithAppHeader from '../components/page-with-app-header';

const RegisterPage = (props) => {
  return (
    <PageWithAppHeader>
      <div>
          <p><Logo/></p>
          <p>Регистрация</p>
          <form>
              <Input type="text" placeholder="Имя"/>
              <Input type="email" placeholder="e-mail"/>
              <Input type="password" placeholder="Пароль" icon="ShowIcon"/>
              <Button type="primary" size="medium">Зарегистрироваться</Button>
          </form>
          <p>Уже зарегстрированы? <Link to="/login">Войти</Link></p>
      </div>
    </PageWithAppHeader>
  );
}

export default RegisterPage;