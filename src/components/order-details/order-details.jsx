import styles from './order-details.module.css'
import {} from '@ya.praktikum/react-developer-burger-ui-components';
import orderSuccessImage from '../../images/ingredient.png'

const OrderDetails = (props) => (
    <div className={styles.OrderDetails}>
        <p className={`${styles.OrderNumber} text text_type_digits-large`}>034536</p>
        <p className="text text_type_main-medium">идентификатор заказа</p>
        <p className={styles.ImageContainer}>
            <img alt="V" src={orderSuccessImage} className={styles.OrderSuccessImage}/>
        </p>
        <p className="text text_type_main-small">Ваш заказ начали готовить</p>
        <p className="text text_type_main-small text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
)

export default OrderDetails;