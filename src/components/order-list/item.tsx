import { FC } from 'react';
import { IOrder, STATUS } from '../../services/types/order';
import styles from './item.module.css'
import { formatRelative } from 'date-fns';
import { ru } from 'date-fns/esm/locale';
import { useSelector } from '../../services/hooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const formatRelativeLocale: { [key: string]: string } = {
    lastWeek: "'Last' eeee",
    tomorrow: "'Tomorrow'",
    nextWeek: "'Next' eeee",
    yesterday: 'Вчера, HH:mm z',
    today: 'Сегодня, HH:mm z',
    other: 'dd.MM.yyyy'
};

const locale = {
    ...ru,
    formatRelative: (token:string) => formatRelativeLocale[token],
};

const localizeStatus = (status: STATUS) => {
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

const getColorOfStatus = (status: STATUS) => {
    switch (status){
        case STATUS.PENDING:
            return '#1C1C21';
        case STATUS.CANCELLED:
            return 'red';
        default:
            return 'white';
    }
}

const Item: FC<IOrder> = ({id, createdAt, fullname, status, ingredientIds}) => {
    const date = formatRelative(new Date(createdAt), new Date(), { locale });
    const ingredients = useSelector(store => store.ingredientsReducer.ingredients);
    const calcPrice = () => {
        return ingredientIds.reduce((acc, currentVal) => {
            const found = ingredients.find(ingr => ingr._id === currentVal);
            return found ? found.price + acc: acc;
        }, 0);
    }
    const price = calcPrice();

    return (
        <div className={styles.itemContainer}>
            <p><span className="text text_type_main-medium">#{id}</span> <span style={{float:"right"}} className="text text_type_main-default text_color_inactive">{date}</span></p>
            <p className={`${styles.fullname} text text_type_main-small`}>{fullname}</p>
            <br/>
            <p className={`text text_type_main-small`} style={{color: getColorOfStatus(status)}}>{localizeStatus(status)}</p>
            <p className={styles.ingredientIds}>
                { 
                    ingredientIds.map((ingredient, index) => {
                        const found = ingredients.find(ingr => ingr._id === ingredient);
                        return (<img key={index} className={styles.ingredientImage} src={found ? found.image_mobile: ""} alt="no img"/>)
                    })
                }
                <span style={{float:"right"}}>
                    <span className="text text_type_main-medium">
                        {price}
                    </span>
                    <span style={{paddingLeft: "10px"}}>
                        <CurrencyIcon type="primary"/>
                    </span>
                </span>
            </p>
            <p></p>
        </div>
    )
}

export default Item;