import styles from './order-list.module.css'
import { FC } from 'react';

interface IOrderStatusBoardProps {
    doneOrderIds: ReadonlyArray<number>,
    pendingOrderIds: ReadonlyArray<number>,
    total: number,
    todayTotal: number
}

const OrderStatusBoard: FC<IOrderStatusBoardProps> = (props) => {
    return (
        <section>
            <div>
                <p>Готовы:</p>
                <OrderList>
                    {props.doneOrderIds}
                </OrderList>
            </div>
            <div>
                <p>В работе:</p>
                <OrderList>
                    {props.pendingOrderIds}
                </OrderList>
            </div>
            <div>
                <p>Выполнено за все время:</p>
                <p>{props.total}</p>
            </div>
            <div>
                <p>Выполнено за сегодня:</p>
                <p>{props.todayTotal}</p>
            </div>
        </section>
    )
}


interface IOrderListProps {
    children: ReadonlyArray<number>
}

const OrderList: FC<IOrderListProps> = ({children}) => (<>{children.map(id => (<p>#{id}</p>))}</>);

export default OrderStatusBoard;