import { FC } from 'react';

export interface IItemProps {
    id: number,
    datetime: string,
    fullname: string,
    price: number,
    ingredients: ReadonlyArray<string>
}

const Item: FC<IItemProps> = ({id, datetime, fullname, price, ingredients}) => {
    return (
        <div>
            <p>#{id} {datetime}</p>
            <p>{fullname}</p>
            <p>{ ingredients.map(ingredient => ingredient) }</p>
            <p></p>
        </div>
    )
}

export default Item;