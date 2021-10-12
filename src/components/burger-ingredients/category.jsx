import React from 'react'

import { Ingredient } from './ingredient'

export class Category extends React.Component {
    renderItems = () => {
        const result = [];
        const items = this.props.children;

        for (let i = 0; i < items.length; i += 2){
            const ingr = items[i];
            const nextIngr = items[i + 1];
            const element = this.renderRow(ingr, nextIngr, i);
            result.push(element);

        }
        return result;
    }

    renderRow = (firstItem, secondItem, i) => (
        <li key={i} style={{listStyleType: 'none'}}>
            { this.renderItem(firstItem) }
            { secondItem ? this.renderItem(secondItem) : <p></p>}
        </li>
    )

    renderItem = (ingr) => (
        <Ingredient
            key={ingr._id}
            image={ingr.image}
            price={ingr.price}
            name={ingr.name}/>
    )

    render = () => (
        <div  style={{marginTop: '40px', marginBottom: '40px'}}>
            <p id={this.props.title} className="text text_type_main-medium" style={{textAlign:'left'}}>{this.props.title}</p>
            <ul style={{textAlign:'left', paddingTop: '24px', paddingLeft: '16px'}}>
                { this.renderItems() }
            </ul>
        </div>
    )
}