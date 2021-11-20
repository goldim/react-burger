import { Button, EmailInput, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import PageWithAppHeader from '../components/page-with-app-header';

const ForgotPasswordPage = (props) => {
  return (
      <PageWithAppHeader>
        <div>
            <p><Logo/></p>
            <p>Восстановление пароля</p>
            <form>
                <EmailInput placeholder="e-mail"/>
                <Button type="primary" size="medium">Восстановить</Button>
            </form>
            <p>Вспомнили пароль? <Link to="/login">Войти</Link></p>
        </div>
      </PageWithAppHeader>
  );
}

export default ForgotPasswordPage;