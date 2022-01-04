import { MenuIcon, ProfileIcon, BurgerIcon, Logo, Button } from '../../utils/yandex-components'
import styles from './app-header.module.css'
import { Link } from 'react-router-dom';
import { FC } from 'react';

interface IIcon {
    type: string,
    className: string
}

interface INavButtonProps {
    title: string;
    icon: any;
    to: string;
}

const NavButton: FC<INavButtonProps> = ({title, icon, to}) => {
    const Icon: FC<IIcon> = icon;
    return (
        <Link to={to}>
            <span className={styles.NavButton}>
            <Button type="secondary" size="medium">
                <Icon type="primary" className={styles.NavButtonIcon}/>
                <div className={`${styles.NavButtonTitle} text text_type_main-default`}>
                    {title}
                </div>
            </Button>
            </span>
        </Link>
    )
}

const AppHeader = () => (
    <header className={styles.AppHeader}>
        <NavButton title="Конструктор" icon={BurgerIcon} to="/constructor"/>
        <NavButton title="Лента заказов" icon={MenuIcon} to="/feed"/>
        <Link to="/"><Logo/></Link>
        <NavButton title="Личный кабинет" icon={ProfileIcon} to="/profile"/>
    </header>
)

export default AppHeader;