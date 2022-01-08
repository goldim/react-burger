import { FC, memo, useEffect } from 'react';
import { IOrder, STATUS, TIngredientIds } from '../../services/types/order';
import { formatRelative } from 'date-fns';
import { ru } from 'date-fns/esm/locale';
import { TDataItems } from '../../services/types/data-item-format';
import { useSelector } from '../../services/hooks';
import { CurrencyIcon } from '../../utils/yandex-components';

import styles from './order.module.css'

interface IInactiveNumberProps {
    children: string
}

const InactiveDate = memo(({children}: IInactiveNumberProps) => (
    <span className="text text_type_digits-small text_color_inactive">{children}</span>
));

export const formatRelativeLocale: { [key: string]: string } = {
    lastWeek: "'Last' eeee",
    tomorrow: "'Tomorrow'",
    nextWeek: "'Next' eeee",
    yesterday: 'Вчера, HH:mm z',
    today: 'Сегодня, HH:mm z',
    other: 'dd.MM.yyyy'
};

export const locale = {
    ...ru,
    formatRelative: (token:string) => formatRelativeLocale[token],
};

export const localizeStatus = (status: STATUS) => {
    switch (status){
        case STATUS.DONE:
            return 'Выполнен';
        case STATUS.CREATED:
            return 'Создан';
        case STATUS.PENDING:
            return 'Готовится';
        case STATUS.CANCELLED:
            return 'Отменен';
        default:
            return 'Неизвестно';
    }
}

export const getColorOfStatus = (status: STATUS) => {
    switch (status){
        case STATUS.DONE:
            return '#009393';
        case STATUS.CANCELLED:
            return 'red';
        default:
            return 'white';
    }
}

export const calcPrice = (ingredientIds: TIngredientIds, ingredients: TDataItems) => {
    return ingredientIds.reduce((acc, currentVal) => {
        const found = ingredients.find(ingr => ingr._id === currentVal);
        return found ? found.price + acc: acc;
    }, 0);
}

const Order: FC<IOrder> = ({id, fullname, status, createdAt, ingredientIds}) => {
    useEffect(() => {
        window.history.replaceState(null, "", "/feed/" + id);
    }, [id]);

    const date = formatRelative(new Date(createdAt), new Date(), { locale });
    const ingredients = useSelector(store => store.ingredientsReducer.ingredients);
    const price = calcPrice(ingredientIds, ingredients);

    return (
        <div className={styles.container}>
            <p className={`${styles.fullname} text text_type_main-medium`}>{fullname}</p>
            <br/>
            <p className={`text text_type_main-small`} style={{color: getColorOfStatus(status)}}>{localizeStatus(status)}</p>
            <br/>
            <p className={`${styles.fullname} text text_type_main-default`}><b>Состав:</b></p>
            <ul className={styles.content}>
                { 
                    ingredientIds.map((ingredient, index) => {
                        const found = ingredients.find(ingr => ingr._id === ingredient);
                        if (found){
                            return (<li key={index} className={styles.ingredientRow}>
                                <span className={styles.ingredientRow}>
                                    <img className={styles.ingredientImage} src={found.image_mobile} alt="no img"/>
                                    <span className="text text_type_main-small">{found.name}</span>
                                </span>
                                <span>
                                    <span className="text text_type_main-medium">
                                        {found.price}
                                    </span>
                                    <span className={styles.currency}>
                                        <CurrencyIcon type="primary"/>
                                    </span>
                                </span>
                            </li>)
                        } else {
                            return (<></>);
                        }
                    })
                }
            </ul>
            <p className={styles.ingredientRow}>
                <InactiveDate>{date}</InactiveDate>
                <span>
                    <span className="text text_type_main-medium">
                        {price}
                    </span>
                    <span className={styles.currency}>
                        <CurrencyIcon type="primary"/>
                    </span>
                </span>
            </p>
            
        </div>
    )
}

export default Order;