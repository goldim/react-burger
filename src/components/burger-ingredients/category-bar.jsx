import PropTypes from 'prop-types'

import { Tab } from '../../utils/yandex-components'
import ingredientsStyles from './burger-ingredients.module.css';

const CategoryBar = ({titles, onTabHandler}) => (
    <div className={ingredientsStyles.categoryBar}>
        { titles.map((title, i) => <Tab key={i} onClick={() => onTabHandler(title)}>{title}</Tab>)}
    </div>
)

CategoryBar.propTypes = {
    titles: PropTypes.arrayOf(PropTypes.string).isRequired,
    onTabHandler: PropTypes.func.isRequired
}

export default CategoryBar;