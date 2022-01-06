import { useReducer, useLayoutEffect, useCallback, FC } from 'react'
import { TDataItems } from '../../services/types/data-item-format'

import { Button, CurrencyIcon } from '../../utils/yandex-components'
import Modal from '../modal'
import OrderDetails from '../order-details'
import styles from './burger-constructor.module.css'
import detailsWindowStyles from '../order-details/order-details.module.css'
import { makeOrder } from '../../services/middleware/order'
import { NEW_ORDER } from '../../services/constants/burger-constructor'
import { getProfile } from '../../services/middleware/auth'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from '../../services/hooks'
import { TRootState } from '../../services/types'

const calcTotalPrice = (ingredients: TDataItems) => ingredients.reduce((acc, current) => acc + current.price, 0);

interface IAction {
    type: string,
    ingredients: TDataItems
}

type TState = number;

const calcTotalPriceReducer = (state: TState, action: IAction) => {
    switch (action.type){
        case 'CALC_TOTAL_PRICE':
            return calcTotalPrice(action.ingredients)
        default:
            return state;
    }
}

interface ITotalBarProps {
    ingredients: TDataItems
}

const TotalBar: FC<ITotalBarProps> = ({ingredients}) => {
    const currentOrder = useSelector((store: TRootState) => store.burgerConstruct.currentOrder);
    const hasBun = useSelector((store: TRootState) => store.burgerConstruct.hasBun);
    const reduxDispatch = useDispatch();
    const name = useSelector((store: TRootState) => store.authReducer.currentUser.name);
    const authed = name !== "";

    const closeModal = () => {
        reduxDispatch({type: NEW_ORDER})
    }

    const init = useCallback(() => {
        reduxDispatch(getProfile());
    }, [reduxDispatch]);

    useLayoutEffect(() => {
        init();
    }, [init]);

    const [totalPrice, dispatch] = useReducer(calcTotalPriceReducer, 0);
    
    useLayoutEffect(() => {
        dispatch({type: 'CALC_TOTAL_PRICE', ingredients});
    }, [ingredients]);

    const navigate = useNavigate();

    const onMakeOrderClick = () => {
        if (authed){
            if (hasBun){
                reduxDispatch(makeOrder(ingredients))
            }
        } else {
            navigate("/login");
        }
    }

    return (
        <div className={styles.totalBar}>
            <div className={styles.priceCurrency}>
                <span className="text text_type_digits-medium">
                    {totalPrice}
                </span>
                <CurrencyIcon type="primary"/>
            </div>
            <Button size="large" onClick={onMakeOrderClick}>
                Оформить заказ
            </Button>
            <StatusModal/>
            <Modal show={!!currentOrder.No} caption="" closeHandler={closeModal}>
                <OrderDetails No={currentOrder.No ? currentOrder.No : 0} success={currentOrder.success ? currentOrder.success : false}/>
            </Modal>
        </div>
    )
}

const StatusModal = () => {
    const {currentOrderIsLoading, currentOrderFailed} = useSelector((store: TRootState) => store.burgerConstruct);
    const reduxDispatch = useDispatch();
    const closeProgressOrFailedModal = () => {
        reduxDispatch({type: NEW_ORDER})
    }
    return (
        <Modal show={currentOrderFailed || currentOrderIsLoading} caption="" closeHandler={closeProgressOrFailedModal}>
            <div className={detailsWindowStyles.OrderDetails}>
                <p className="text text_type_main-medium">
                    {(currentOrderIsLoading) ? "Загрузка...": "Произошел сбой в выполнении заказа"}
                </p>
            </div>
        </Modal>
    );
}

export default TotalBar;