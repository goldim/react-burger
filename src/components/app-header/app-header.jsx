import React from 'react'
import { MenuIcon, ProfileIcon, BurgerIcon, Logo, Button } from '@ya.praktikum/react-developer-burger-ui-components'

export class AppHeader extends React.Component {
    auth = () => {
        alert("auth");
    }

    render = () => 
        <header>
            <nav>
                <Button type="secondary" size="medium">
                    <BurgerIcon type="primary"/>Конструктор
                </Button>
                <Button type="secondary" size="medium">
                    <MenuIcon type="primary" />
                    Лента заказов
                </Button>
                <Logo/>
                <Button type="secondary" size="medium" onClick={this.auth}>
                    <ProfileIcon type="primary" />Личный кабинет
                </Button>
            </nav>
        </header>
}