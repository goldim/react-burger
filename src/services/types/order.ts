export interface IOrder {
    id: number,
    createdAt: string,
    fullname: string,
    status: STATUS,
    ingredientIds: TIngredientIds
};

export type TIngredientIds = ReadonlyArray<string>;

export enum STATUS {
    DONE = 'done',
    CREATED = 'created',
    CANCELLED = 'cancelled',
    PENDING = 'pending'
};

export interface IServerOrder {
    createdAt: string,
    updatedAt: string,
    number: number,
    _id: string,
    ingredients: TIngredientIds
    status: STATUS,
    name: string
}

export interface IServerOrderReply {
    orders: ReadonlyArray<IServerOrder>,
    total: number,
    totalToday: number
};

export type TOrders = ReadonlyArray<IOrder>;