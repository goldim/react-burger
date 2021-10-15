import PropTypes from 'prop-types'

import { Tab } from '../../utils/yandex-components'
import ingredientsStyles from './burger-ingredients.module.css';

const CategoryBar = (props) => (
    <div className={ingredientsStyles.categoryBar}>
        { props.titles.map((title, i) => <Tab key={i} onClick={() => props.clickTab(title)}>{title}</Tab>)}
    </div>
)

CategoryBar.propTypes = {
    titles: PropTypes.array,
    clickTab: PropTypes.func
}

export default CategoryBar;