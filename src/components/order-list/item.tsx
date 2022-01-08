import { FC, useState } from 'react';
import { IOrder } from '../../services/types/order';
import styles from './item.module.css'
import { useSelector } from '../../services/hooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal';
import { formatRelative } from 'date-fns';
import Order, { getColorOfStatus, localizeStatus, locale, calcPrice } from '../order';

const Item: FC<IOrder> = ({id, createdAt, fullname, status, ingredientIds}) => {
    const date = formatRelative(new Date(createdAt), new Date(), { locale });
    const ingredients = useSelector(store => store.ingredientsReducer.ingredients);
    
    const price = calcPrice(ingredientIds, ingredients);

    const [modal, setModal] = useState(false);

    const onClick = () => {
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
    }

    return (
        <>
        <div className={styles.itemContainer} onClick={onClick}>
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
        </div>
        <Modal show={modal} caption={`#${id}`} closeHandler={closeModal}>
            <Order {...{id, createdAt, fullname, status, ingredientIds}}/>
        </Modal>
        </>
    )
}

export default Item;