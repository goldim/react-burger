import styles from './order-list.module.css'
import Item, { IItemProps } from './item'
import { FC } from 'react';

type TItems = ReadonlyArray<IItemProps>;
export interface IOrderListProps {
    items: TItems
}

const OrderList: FC<IOrderListProps> = ({items}) => {
    return (
        <div>
            <p>Лента заказов</p>
            {
                items.map(item => <Item {...item}/>)
            }
        </div>
    )
}

export default OrderList;