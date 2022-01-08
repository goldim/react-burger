import styles from './order-list.module.css'
import Item from './item'
import { FC } from 'react';
import { TOrders } from '../../services/types/order';

export interface IOrderListProps {
    items: TOrders
}

const OrderList: FC<IOrderListProps> = ({items}) => {
    return (
        <section className={styles.ordersContainer}>
            <Title/>
            <div className={styles.ordersList}>
            {
                items.map(item => <Item {...item}/>)
            }
            </div>
        </section>
    )
}

const Title = () => (
    <p className={`${styles.title} text text_type_main-large`}>
        Лента заказов
    </p>
);

export default OrderList;