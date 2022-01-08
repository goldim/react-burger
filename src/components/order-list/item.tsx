import { FC } from 'react';
import { IOrder } from '../../services/types/order';
import styles from './item.module.css'

const Item: FC<IOrder> = ({id, createdAt, fullname, price, ingredientIds}) => {
    return (
        <div className={styles.itemContainer}>
            <p>#{id} {createdAt}</p>
            <p className={styles.fullname}>{fullname}</p>
            <p className={styles.ingredientIds}>{ ingredientIds.map(ingredient => ingredient + ' ') }</p>
            <p>{price}</p>
        </div>
    )
}

export default Item;