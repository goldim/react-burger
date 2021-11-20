import { Button, EmailInput, Logo, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import PageWithAppHeader from '../components/page-with-app-header';

const LoginPage = (props) => {
  return (
    <PageWithAppHeader>
      <div>
        <p><Logo/></p>
        <p>Вход</p>
        <form>
            <EmailInput placeholder="e-mail"/>
            <PasswordInput placeholder="Пароль"/>
            <Button type="primary" size="medium">Войти</Button>
        </form>
        <p>Вы - новый пользователь? <Link to="/register">Зарегистрироваться</Link></p>
        <p>Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link></p>
      </div>
    </PageWithAppHeader>
  );
}

export default LoginPage;