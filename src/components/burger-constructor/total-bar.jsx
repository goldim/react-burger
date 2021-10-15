import { Button, CurrencyIcon } from '../../utils/yandex-components'
import styles from './burger-constructor.module.css'

const makeOrder = () => {
    alert("hello");
}

const TotalBar = (props) => (
    <div className={styles.totalBar}>
        <div className={styles.priceCurrency}>
            <span className="text text_type_digits-medium">
                { props.totalPrice }
            </span>
            <CurrencyIcon/>
        </div>
        <Button size="large" onClick={makeOrder}>
            Оформить заказ
        </Button>
    </div>
)

export default TotalBar;