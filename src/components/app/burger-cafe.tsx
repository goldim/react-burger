import BurgerConstructor from '../burger-constructor'
import BurgerIngredients from '../burger-ingredients'

import { FC } from 'react'
import { useSelector } from '../../services/hooks'

const BurgerCafe = () => {
    const { loadingFailed, isLoading } = useSelector(store => (store.ingredientsReducer));

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