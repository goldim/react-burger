import { memo } from 'react';
import styles from './ingredient-details.module.css'

interface ISmallTextProps {
    children: string
}

const SmallText = memo(({children}: ISmallTextProps) => (
    <p className="text text_type_main-small text_color_inactive">{children}</p>
));

interface IInactiveNumberProps {
    children: string
}

const InactiveNumber = memo(({children}: IInactiveNumberProps) => (
    <p className="text text_type_digits-default text_color_inactive">{children}</p>
));

const Order = () => {
    return (
        <div className={styles.container}>
            <SmallText>#1111</SmallText>
            <p>Black Hole Sun Burger</p>
            <p>Выполнен</p>
            <p>Состав</p>
            <div>
            </div>
            <InactiveNumber>Вчера, 13.12</InactiveNumber>
        </div>
    )
}

export default Order;