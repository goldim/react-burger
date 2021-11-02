import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';

import { Tab } from '../../utils/yandex-components'
import ingredientsStyles from './burger-ingredients.module.css';

import { CHANGE_CURRENT_CATEGORY_BY_ID } from '../../services/actions/burger-ingredients';
import { useEffect } from 'react';

const CategoryBar = ({titles}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (titles && titles[0]){
            dispatch({
                type: CHANGE_CURRENT_CATEGORY_BY_ID,
                id: titles[0]
            });
        }
    }, [dispatch, titles]);

    const renderTab = (title, id) => {
        return (<MyTab key={id} title={title}/>);
    }

    return (
        <div className={ingredientsStyles.categoryBar}>
            { titles.map(renderTab)}
        </div>
    );
}

const MyTab = ({title}) => {
    const active = useSelector(store => store.ingredientsReducer.currentCategory);
    const dispatch = useDispatch();
    const moveTo = (a) => {
        document.getElementById(a).scrollIntoView();
        dispatch({
            type: CHANGE_CURRENT_CATEGORY_BY_ID,
            id: title
        });
    }
    return (<Tab onClick={() => moveTo(title)} active={active === title}>{title}</Tab>);
}

CategoryBar.propTypes = {
    titles: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default CategoryBar;