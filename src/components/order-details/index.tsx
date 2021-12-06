import styles from './order-details.module.css'
import '../../utils/yandex-components';
import orderSuccessImage from '../../images/ingredient.png'
import { FC } from 'react';

interface IOrderDetailsProps {
    No: number;
    success: boolean;
};

const OrderDetails: FC<IOrderDetailsProps> = ({No = 0, success = false}) => (
    <div className={styles.OrderDetails}>
        <p className={`${styles.OrderNumber} text text_type_digits-large`}>{No}</p>
        <p className="text text_type_main-medium">идентификатор заказа</p>
        <p className={styles.ImageContainer}>
            {
                success && (<img alt="V" src={orderSuccessImage} className={styles.OrderSuccessImage}/>)
            }
        </p>
        <p className="text text_type_main-small">Ваш заказ начали готовить</p>
        <p className="text text_type_main-small text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
)

export default OrderDetails;