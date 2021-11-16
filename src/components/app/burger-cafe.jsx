import { useDispatch, useSelector } from 'react-redux'

import BurgerConstructor from '../burger-constructor/burger-constructor'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'

import { getIngredients } from '../../services/middleware'
import { useEffect } from 'react'

const BurgerCafe = () => {
    const dispatch = useDispatch();
    const { loadingFailed, isLoading } = useSelector((store) => (store.ingredientsReducer));

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    if (loadingFailed){
        return (<InformMessage>Произошла ошибка при получении данных</InformMessage>);
    }
    else if (isLoading){
        return (<InformMessage>Загрузка...</InformMessage>);
    }
    else {
        return (
            <>
                <BurgerIngredients/>
                <BurgerConstructor/>
            </>
        );
    }
}

const InformMessage = (props) => <p className="text text_type_main-medium">{props.children}</p>

export default BurgerCafe;