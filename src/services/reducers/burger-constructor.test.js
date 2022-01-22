import { BurgerConstructorReducer as reducer } from "./burger-constructor"

describe('burger constructor reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
        {
            chosenIngredients: [],
            hasBun: false,
            currentOrder: {},
            currentOrderFailed: false,
            currentOrderIsLoading: false
        }
    )
  })
})