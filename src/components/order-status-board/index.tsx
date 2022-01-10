import { FC } from 'react';

import styles from './order-status-board.module.css'

interface IOrderStatusBoardProps {
    doneOrderIds: ReadonlyArray<number>,
    pendingOrderIds: ReadonlyArray<number>,
    total: number,
    todayTotal: number
}

const OrderStatusBoard: FC<IOrderStatusBoardProps> = (props) => {
    return (
        <section className={styles.container}>
            <div className={styles.columns}>
                <div>
                    <OrderList title="Готовы" color="#009393">
                        {props.doneOrderIds}
                    </OrderList>
                </div>
                <div>
                    <OrderList title="В работе">
                        {props.pendingOrderIds}
                    </OrderList>
                </div>
            </div>
            <div>
                <p className="text text_type_main-medium">Выполнено за все время:</p>
                <p className="text text_type_digits-large">{props.total}</p>
            </div>
            <div>
                <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                <p className="text text_type_digits-large">{props.todayTotal}</p>
            </div>
        </section>
    )
}

interface IOrderListProps {
    title: string,
    children: ReadonlyArray<number>,
    color?: string
}

const OrderList: FC<IOrderListProps> = ({children, title, color}) => (
    <>
        <p className="text text_type_main-medium">{title}:</p>
        <div className={styles.column}>
            {children.map((id, index) => (<p className="text text_type_digits-default" style={{color}} key={index}>{id}</p>))}
        </div>
    </>
);

export default OrderStatusBoard;