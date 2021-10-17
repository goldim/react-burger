import { MenuIcon, ProfileIcon, BurgerIcon, Logo, Button } from '../../utils/yandex-components'
import styles from './app-header.module.css'

import PropTypes from 'prop-types';

const NavButton = ({title, icon}) => {
    const Icon = icon;
    return (
        <Button type="secondary" size="medium" className={styles.NavButton}>
            <Icon type="primary" className={styles.NavButtonIcon}/>
            <div className={`${styles.NavButtonTitle} text text_type_main-default`}>
                {title}
            </div>
        </Button>
    )
}

NavButton.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.func.isRequired
}

const AppHeader = () => (
    <header className={styles.AppHeader}>
        <NavButton title="Конструктор" icon={BurgerIcon}/>
        <NavButton title="Лента заказов" icon={MenuIcon}/>
        <Logo/>
        <NavButton title="Личный кабинет" icon={ProfileIcon}/>
    </header>
)

export default AppHeader;