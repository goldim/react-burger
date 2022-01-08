import { FC } from 'react';
import { IOrder } from '../../services/types/order';
import styles from './item.module.css'

// export interface IItemProps {
//     id: number,
//     datetime: string,
//     fullname: string,
//     price: number,
//     ingredients: ReadonlyArray<string>
// }

const Item: FC<IOrder> = ({id, createdAt, fullname, price, ingredientIds}) => {
    return (
        <div className={styles.itemContainer}>
            <p>#{id} {createdAt}</p>
            <p style={{wordBreak: "normal"}}>{fullname}</p>
            <p style={{wordBreak: "normal"}}>{ ingredientIds.map(ingredient => ingredient + ' ') }</p>
            <p></p>
        </div>
    )
}

export default Item;