import { clearOrders, newOrderCame, startFetchingOrders, updateTotals } from "../actions/order"
import { STATUS } from "../types/order"
import { OrderReducer as reducer } from "./order"

describe('order reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        total: 0,
        totalToday: 0,
        orders: []
      }
    )
  })

  it('should handle START_FETCHING_ORDERS', () => {
    const action = startFetchingOrders();
    expect(reducer(undefined, action)).toEqual(
      {
        total: 0,
        totalToday: 0,
        orders: []
      }
    )
  })

  it('should handle UPDATE_TOTALS', () => {
    const action = updateTotals(1, 2);
    expect(reducer(undefined, action)).toEqual(
      {
        total: 1,
        totalToday: 2,
        orders: []
      }
    )
  })

  it('should handle CLEAR_ORDERS', () => {
    const action = clearOrders();
    expect(reducer(undefined, action)).toEqual(
      {
        total: 0,
        totalToday: 0,
        orders: []
      }
    )
  })

  it('should handle CLEAR_ORDERS', () => {
    const inititialState = {
        total: 3,
        totalToday: 4,
        orders: [{
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
            number: 1,
            _id: "testId",
            ingredients: [],
            status: STATUS.DONE,
            name: "testOrder"
        }]
    }
    const action = clearOrders();
    expect(reducer(inititialState, action)).toEqual(
      {
        total: 0,
        totalToday: 0,
        orders: []
      }
    )
  })

  describe('should handle NEW_ORDER_CAME', () => {
    const createdAt = new Date().toString();
    const updatedAt = new Date().toString();

    it('gets new order', () => {
      const action = newOrderCame({
          orders: [
              {
                  createdAt,
                  updatedAt,
                  number: 1,
                  _id: "testId",
                  ingredients: [],
                  status: STATUS.PENDING,
                  name: "testOrder"
              }
          ],
          total: 3,
          totalToday: 4
      });

      expect(reducer(undefined, action)).toEqual(
          {
              orders: [
                  {
                      createdAt,
                      id: 1,
                      ingredientIds: [],
                      fullname: "testOrder",
                      status: STATUS.PENDING
                  }
              ],
              total: 3,
              totalToday: 4
          }
      )
    });

    it('gets existed order but with new status', () => {
      const inititialState =  {
        orders: [
            {
                createdAt,
                id: 1,
                ingredientIds: [],
                fullname: "testOrder",
                status: STATUS.PENDING
            }
        ],
        total: 3,
        totalToday: 4
      };

      const action = newOrderCame({
        orders: [
            {
                createdAt,
                updatedAt,
                number: 1,
                _id: "testId",
                ingredients: [],
                status: STATUS.DONE,
                name: "testOrder"
            }
        ],
        total: 3,
        totalToday: 4
      });

      expect(reducer(inititialState, action)).toEqual(
          {
              orders: [
                  {
                      createdAt,
                      id: 1,
                      ingredientIds: [],
                      fullname: "testOrder",
                      status: STATUS.DONE
                  }
              ],
              total: 3,
              totalToday: 4
          }
      )
    });

    it('gets existed order with the same status', () => {
      const inititialState =  {
        orders: [
            {
                createdAt,
                id: 1,
                ingredientIds: [],
                fullname: "testOrder",
                status: STATUS.PENDING
            }
        ],
        total: 3,
        totalToday: 4
      };

      const action = newOrderCame({
        orders: [
            {
                createdAt,
                updatedAt,
                number: 1,
                _id: "testId",
                ingredients: [],
                status: STATUS.PENDING,
                name: "testOrder"
            }
        ],
        total: 3,
        totalToday: 4
      });

      expect(reducer(inititialState, action)).toEqual(
          {
              orders: [
                  {
                      createdAt,
                      id: 1,
                      ingredientIds: [],
                      fullname: "testOrder",
                      status: STATUS.PENDING
                  }
              ],
              total: 3,
              totalToday: 4
          }
      )
    });
  })
})