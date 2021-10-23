import styles from './order-details.module.css'
import {} from '@ya.praktikum/react-developer-burger-ui-components';
import orderSuccessImage from '../../images/ingredient.png'
import PropTypes from 'prop-types'

const OrderDetails = ({No, success}) => (
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

OrderDetails.defaultProps = {
    No: 0,
    success: false
}

OrderDetails.propTypes = {
    No: PropTypes.number.isRequired,
    success: PropTypes.bool.isRequired
}

export default OrderDetails;