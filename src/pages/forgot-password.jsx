import { Button, Input, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = (props) => {
  return (
    <div>
        <p><Logo/></p>
        <p>Восстановление пароля</p>
        <form>
            <Input type="email" placeholder="e-mail"/>
            <Button type="primary" size="medium">Восстановить</Button>
        </form>
        <p>Вспомнили пароль? <Link to="/login">Войти</Link></p>
    </div>
  );
}

export default ForgotPasswordPage;