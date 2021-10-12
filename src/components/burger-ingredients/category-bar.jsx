import React from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import ingredientsStyles from './burger-ingredients.module.css';

export class CategoryBar extends React.Component {
    render = () => (
        <div className={ingredientsStyles.categoryBar}>
            { this.props.titles.map((title, i) => <Tab key={i} onClick={() => this.props.clickTab(title)}>{title}</Tab>)}
        </div>
    )
}