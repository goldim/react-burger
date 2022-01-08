export interface IOrder {
    id: number,
    createdAt: Date,
    fullname: string,
    price: number,
    status: STATUS,
    ingredientIds: ReadonlyArray<string>
};

export enum STATUS {
    DONE = 'done',
    CREATED = 'created',
    PENDING = 'pending'
};

export type TOrders = ReadonlyArray<IOrder>;