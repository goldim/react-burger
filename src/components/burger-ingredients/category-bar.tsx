import { useDispatch, useSelector } from 'react-redux';

import { Tab } from '../../utils/yandex-components'
import ingredientsStyles from './burger-ingredients.module.css';

import { CHANGE_CURRENT_CATEGORY_BY_ID } from '../../services/actions/burger-ingredients';
import { FC, useEffect } from 'react';

interface ICategoryBarProps {
    titles: ReadonlyArray<string>
}

const CategoryBar: FC<ICategoryBarProps> = ({titles}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (titles && titles[0]){
            dispatch({
                type: CHANGE_CURRENT_CATEGORY_BY_ID,
                id: titles[0]
            });
        }
    // eslint-disable-next-line 
    }, [dispatch]);

    const renderTab = (title: string, id: number) => {
        return (<MyTab key={id} title={title}/>);
    }

    return (
        <div className={ingredientsStyles.categoryBar}>
            { titles.map(renderTab)}
        </div>
    );
}

interface IMyTabProps {
    title: string
}

const MyTab: FC<IMyTabProps> = ({title}) => {
    const active = useSelector((store: any) => store.ingredientsReducer.currentCategory);
    const dispatch = useDispatch();
    const moveTo = (titleId: string) => {
        const doc: any = document;
        doc.getElementById(titleId).scrollIntoView();
        
        dispatch({
            type: CHANGE_CURRENT_CATEGORY_BY_ID,
            id: title
        });
    }
    return (<Tab onClick={() => moveTo(title)} active={active === title} value={title}>{title}</Tab>);
}

export default CategoryBar;