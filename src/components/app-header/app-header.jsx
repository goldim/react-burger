import React from 'react'
import { Logo, Button } from '@ya.praktikum/react-developer-burger-ui-components'

export class AppHeader extends React.Component {
    auth = () => {
        alert("auth");
    }

    render = () => 
        <nav>
            <Button type="secondary" size="medium">Конструктор</Button>
            <Button type="secondary" size="medium">Лента заказов</Button>
            <Logo/>
            <Button type="secondary" size="medium" onClick={this.auth}>Личный кабинет</Button>
        </nav>
}