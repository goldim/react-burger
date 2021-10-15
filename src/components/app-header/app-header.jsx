import React from 'react'
import { MenuIcon, ProfileIcon, BurgerIcon, Logo, Button } from '../../utils/yandex-components'
import styles from './app-header.module.css'

const NavButton = (props) => {
    const Icon = props.icon;
    return (
        <Button type="secondary" size="medium" className={styles.NavButton} onClick={props.onClick}>
            <Icon type="primary" className={styles.NavButtonIcon}/>
            <div className={`${styles.NavButtonTitle} text text_type_main-default`}>
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
        <header className={styles.AppHeader}>
            <NavButton title="Конструктор" icon={BurgerIcon}/>
            <NavButton title="Лента заказов" icon={MenuIcon}/>
            <Logo/>
            <NavButton title="Личный кабинет" icon={ProfileIcon} onClick={this.auth}/>
        </header>
    )
}