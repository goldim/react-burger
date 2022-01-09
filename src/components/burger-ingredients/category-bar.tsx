import { Tab } from '../../utils/yandex-components'
import ingredientsStyles from './burger-ingredients.module.css';

import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { changeCurrentCategoryById } from '../../services/actions/burger-ingredients';

interface ICategoryBarProps {
    titles: ReadonlyArray<string>
}

const CategoryBar: FC<ICategoryBarProps> = ({titles}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (titles && titles[0]){
            dispatch(changeCurrentCategoryById(titles[0]));
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
    const active = useSelector(store => store.ingredientsReducer.currentCategory);
    const dispatch = useDispatch();
    const moveTo = (titleId: string) => {
        const doc: any = document;
        doc.getElementById(titleId).scrollIntoView();
        dispatch(changeCurrentCategoryById(title));
    }
    return (<Tab onClick={() => moveTo(title)} active={active === title} value={title}>{title}</Tab>);
}

export default CategoryBar;