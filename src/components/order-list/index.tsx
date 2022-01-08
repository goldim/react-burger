import styles from './order-list.module.css'
import Item from './item'
import { FC } from 'react';
import { TOrders } from '../../services/types/order';

export interface IOrderListProps {
    items: TOrders
}

const OrderList: FC<IOrderListProps> = ({items}) => (
    <div className={`${styles.ordersContainer} ${styles.ordersList}`}>
        {
            items.map((item, index) => <Item key={index} {...item}/>)
        }
    </div>
)

export default OrderList;