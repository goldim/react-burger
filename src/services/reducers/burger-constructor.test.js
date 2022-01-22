import { addBun, addIngredient, makeOrderFailed, makeOrderGenerator, makeOrderSuccess, moveIngredient, newOrder, removeIngredient } from "../actions/burger-constructor"
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

  describe('handling ADD_BUN', () => {
    const action = addBun("bunId");

    it("should add bun if no bun in", () => {
      const initialState = {
        chosenIngredients: ["ingredientId"],
        hasBun: false,
        currentOrder: {},
        currentOrderFailed: false,
        currentOrderIsLoading: false
      };

      expect(reducer(initialState, action)).toEqual(
        {
           chosenIngredients: ["bunId", "ingredientId", "bunId"],
              hasBun: true,
              currentOrder: {},
              currentOrderFailed: false,
              currentOrderIsLoading: false
        }
      )
    })

    it("should replace bun if already in", () => {
      const initialState = {
        chosenIngredients: ["bunId1", "ingredientId", "bunId1"],
        hasBun: true,
        currentOrder: {},
        currentOrderFailed: false,
        currentOrderIsLoading: false
      };

      expect(reducer(initialState, action)).toEqual(
        {
           chosenIngredients: ["bunId", "ingredientId", "bunId"],
              hasBun: true,
              currentOrder: {},
              currentOrderFailed: false,
              currentOrderIsLoading: false
        }
      )
    })
  })

  describe('handling ADD_INGREDIENT', () => {
    const action = addIngredient("ingredientId");

    it("should add ingredient after bun if bun in", () => {
      const initialState = {
        chosenIngredients: ["bunId", "bunId"],
        hasBun: true,
        currentOrder: {},
        currentOrderFailed: false,
        currentOrderIsLoading: false
      };

      expect(reducer(initialState, action)).toEqual(
        {
           chosenIngredients: ["bunId", "ingredientId", "bunId"],
              hasBun: true,
              currentOrder: {},
              currentOrderFailed: false,
              currentOrderIsLoading: false
        }
      )
    })

    it("should add ingredient", () => {
      const initialState = {
        chosenIngredients: [],
        hasBun: false,
        currentOrder: {},
        currentOrderFailed: false,
        currentOrderIsLoading: false
      };

      expect(reducer(initialState, action)).toEqual(
        {
           chosenIngredients: ["ingredientId"],
              hasBun: false,
              currentOrder: {},
              currentOrderFailed: false,
              currentOrderIsLoading: false
        }
      )
    })
  })

  it('should handle REMOVE_INGREDIENT', () => {
    const initialState = {
      chosenIngredients: ["ingredientId"],
      hasBun: false,
      currentOrder: {},
      currentOrderFailed: false,
      currentOrderIsLoading: false
    };

    const action = removeIngredient("ingredientId");

    expect(reducer(initialState, action)).toEqual(
      {
         chosenIngredients: [],
            hasBun: false,
            currentOrder: {},
            currentOrderFailed: false,
            currentOrderIsLoading: false
      }
    )
  })

  describe('handling MOVE_INGREDIENT', () => {
    it("shouldn't have bun", () => {
      const initialState = {
        chosenIngredients: ["ingredientId1", "ingredientId2"],
        hasBun: false,
        currentOrder: {},
        currentOrderFailed: false,
        currentOrderIsLoading: false
      };
  
      const action = moveIngredient(0, 1);
  
      expect(reducer(initialState, action)).toEqual(
        {
           chosenIngredients: ["ingredientId2", "ingredientId1"],
              hasBun: false,
              currentOrder: {},
              currentOrderFailed: false,
              currentOrderIsLoading: false
        }
      )
    })

    it("shouldn have bun", () => {
      const initialState = {
        chosenIngredients: ["bunId", "ingredientId1", "ingredientId2", "bunId"],
        hasBun: true,
        currentOrder: {},
        currentOrderFailed: false,
        currentOrderIsLoading: false
      };
  
      const action = moveIngredient(0, 1);
  
      expect(reducer(initialState, action)).toEqual(
        {
           chosenIngredients: ["bunId", "ingredientId2", "ingredientId1", "bunId"],
              hasBun: true,
              currentOrder: {},
              currentOrderFailed: false,
              currentOrderIsLoading: false
        }
      )
    })
  })

  it('should handle MAKE_ORDER', () => {
    const action = makeOrderGenerator();

    expect(reducer(undefined, action)).toEqual(
      {
         chosenIngredients: [],
            hasBun: false,
            currentOrder: {},
            currentOrderFailed: false,
            currentOrderIsLoading: true
      }
    )
  })

  it('should handle MAKE_ORDER_SUCCESS', () => {
    const action = makeOrderSuccess(1, true);

    expect(reducer(undefined, action)).toEqual(
      {
         chosenIngredients: [],
            hasBun: false,
            currentOrder: {
              No: 1,
              success: true
            },
            currentOrderFailed: false,
            currentOrderIsLoading: false
      }
    )
  })

  it('should handle MAKE_ORDER_FAILED', () => {
    const action = makeOrderFailed();

    expect(reducer(undefined, action)).toEqual(
      {
         chosenIngredients: [],
            hasBun: false,
            currentOrder: {},
            currentOrderFailed: true,
            currentOrderIsLoading: false
      }
    )
  })

  it('should handle NEW_ORDER', () => {
    const initialState = {
      chosenIngredients: [],
      hasBun: false,
      currentOrder: {
        No: 1,
        success: true
      },
      currentOrderFailed: false,
      currentOrderIsLoading: false
    };

    const action = newOrder();

    expect(reducer(initialState, action)).toEqual(
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