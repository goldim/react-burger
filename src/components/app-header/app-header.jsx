import React from 'react'
import { MenuIcon, ProfileIcon, BurgerIcon, Logo, Button } from '@ya.praktikum/react-developer-burger-ui-components'

export class AppHeader extends React.Component {
    auth = () => {
        alert("auth");
    }

    render = () => (
        <header>
            {/* <nav style={{marginLeft: "0px"}}> */}
                <Button type="secondary" size="medium" style={{marginTop: "16px", marginBottom: "16px"}}>
                    <BurgerIcon type="primary" style={{marginRight: "8px"}}/>
                    <div style={{float:"right", marginLeft: "13px"}} className="text text_type_main-default">
                        Конструктор
                    </div>
                </Button>
                <Button type="secondary" size="medium" style={{marginLeft: "20px", marginRight: "8px"}}>
                    <MenuIcon type="primary" />
                    <div style={{float:"right", marginLeft: "13px"}}>
                        Лента заказов
                    </div>
                </Button>
                <div style={{display: "inline-block"}}><Logo/></div>
                <Button type="secondary" size="medium" onClick={this.auth} style={{marginLeft: "20px", marginRight: "8px"}}>
                    <ProfileIcon type="primary" />
                    <div style={{float:"right", marginLeft: "13px"}}>
                        Личный кабинет
                    </div>
                </Button>
            {/* </nav> */}
        </header>
    )
}