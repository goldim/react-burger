import { BurgerIngredientsReducer as reducer } from "./burger-ingredients"

describe('burger ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
        {
            ingredients: [],
            currentIngredient: {
                _id: "",
                name: "",
                type: "",
                proteins: 0,
                fat: 0,
                carbohydrates: 0,
                calories: 0,
                price: 0,
                image: "",
                image_mobile: "",
                image_large: "",
                __v: 0,
            },
            currentCategory: undefined,
            categoryIds: [],
            isLoading: false,
            loadingFailed: false
        }
    )
  })
})