import { Button, Input, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

const ResetPasswordPage = (props) => {
  return (
    <div>
        <p><Logo/></p>
        <p>Восстановление пароля</p>
        <form>
            <Input type="password" placeholder="Введите новый пароль" icon="ShowIcon"/>
            <Input type="text" placeholder="Введите код из письма"/>
            <Button type="primary" size="medium">Сохранить</Button>
        </form>
        <p>Вспомнили пароль? <Link to="/login">Войти</Link></p>
    </div>
  );
}

export default ResetPasswordPage;