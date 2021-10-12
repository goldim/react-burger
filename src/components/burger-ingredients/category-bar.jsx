import React from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

export class CategoryBar extends React.Component {
    render = () => (
        <div style={{ display: 'flex' }}>
            { this.props.titles.map((title, i) => <Tab key={i} onClick={() => this.props.clickTab(title)}>{title}</Tab>)}
        </div>
    )
}