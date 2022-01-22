import { OrderReducer as reducer } from "./order"

describe('order reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        total: 0,
        todayTotal: 0,
        orders: []
      }
    )
  })
})