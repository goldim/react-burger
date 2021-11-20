import { Button, Input, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import PageWithAppHeader from '../components/page-with-app-header';

const LoginPage = (props) => {
  return (
    <PageWithAppHeader>
      <div>
        <p><Logo/></p>
        <p>Вход</p>
        <form>
            <Input type="email" placeholder="e-mail"/>
            <Input type="password" placeholder="Пароль" icon="ShowIcon"/>
            <Button type="primary" size="medium">Войти</Button>
        </form>
        <p>Вы - новый пользователь? <Link to="/register">Зарегистрироваться</Link></p>
        <p>Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link></p>
      </div>
    </PageWithAppHeader>
  );
}

export default LoginPage;