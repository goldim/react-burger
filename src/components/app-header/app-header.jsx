import React from 'react'
import { MenuIcon, ProfileIcon, BurgerIcon, Logo, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'

const NavButton = (props) => {
    const Icon = props.icon;
    return (
        <Button type="secondary" size="medium" className={styles.navButton} onClick={props.onClick}>
            <Icon type="primary" className={styles.navButtonIcon}/>
            <div className={`${styles.navButtonTitle} text text_type_main-default`}>
                {props.title}
            </div>
        </Button>
    )
}

export class AppHeader extends React.Component {
    auth = () => {
        alert("auth");
    }

    render = () => (
        <header>
            <NavButton title="Конструктор" icon={BurgerIcon}/>
            <NavButton title="Лента заказов" icon={MenuIcon}/>
            <Logo/>
            <NavButton title="Личный кабинет" icon={ProfileIcon} onClick={this.auth}/>
        </header>
    )
}