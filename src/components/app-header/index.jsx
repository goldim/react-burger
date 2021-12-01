import { MenuIcon, ProfileIcon, BurgerIcon, Logo, Button } from '../../utils/yandex-components'
import styles from './app-header.module.css'

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavButton = ({title, icon, to}) => {
    const Icon = icon;
    return (
        <Link to={to}>
            <Button type="secondary" size="medium" className={styles.NavButton}>
                <Icon type="primary" className={styles.NavButtonIcon}/>
                <div className={`${styles.NavButtonTitle} text text_type_main-default`}>
                    {title}
                </div>
            </Button>
        </Link>
    )
}

NavButton.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.func.isRequired
}

const AppHeader = () => (
    <header className={styles.AppHeader}>
        <NavButton title="Конструктор" icon={BurgerIcon} to="/constructor"/>
        <NavButton title="Лента заказов" icon={MenuIcon} to="/orders"/>
        <Link to="/"><Logo/></Link>
        <NavButton title="Личный кабинет" icon={ProfileIcon} to="/profile"/>
    </header>
)

export default AppHeader;