import { FC } from 'react';
import { IOrder } from '../../services/types/order';
import styles from './item.module.css'
import { formatRelative } from 'date-fns';
import { ru } from 'date-fns/esm/locale';

const formatRelativeLocale: { [key: string]: string } = {
    lastWeek: "'Last' eeee",
    tomorrow: "'Tomorrow'",
    nextWeek: "'Next' eeee",
    yesterday: 'Вчера, hh:mm z',
    today: 'Сегодня, hh:mm z',
    other: 'dd.MM.yyyy'
};

const locale = {
    ...ru,
    formatRelative: (token:string) => formatRelativeLocale[token],
};

const Item: FC<IOrder> = ({id, createdAt, fullname, price, ingredientIds}) => {
    const date = formatRelative(new Date(createdAt), new Date(), { locale });

    return (
        <div className={styles.itemContainer}>
            <p><span className="text text_type_main-medium">#{id}</span> <span style={{float:"right"}} className="text text_type_main-default text_color_inactive">{date}</span></p>
            <p className={styles.fullname}>{fullname}</p>
            <p className={styles.ingredientIds}>{ ingredientIds.map(ingredient => ingredient + ' ') }</p>
            <p>{price}</p>
        </div>
    )
}

export default Item;