import { useDispatch, useSelector } from 'react-redux'

import BurgerConstructor from '../burger-constructor'
import BurgerIngredients from '../burger-ingredients'

import { getIngredients } from '../../services/middleware'
import { FC, useEffect } from 'react'

const BurgerCafe = () => {
    const dispatch = useDispatch();
    const { loadingFailed, isLoading } = useSelector((store: any) => (store.ingredientsReducer));

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

interface IInformMessageProps {
    children: string
}

const InformMessage: FC<IInformMessageProps> = ({children}) => <p className="text text_type_main-medium">{children}</p>

export default BurgerCafe;