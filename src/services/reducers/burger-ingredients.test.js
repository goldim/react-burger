import { addCategoryId, changeCurrentCategoryByDistance, changeCurrentCategoryById, changeCurrentIngredient, clearCurrentIngredient, loadIngredients, loadIngredientsFailed, loadIngredientsSuccess } from "../actions/burger-ingredients"
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

  it('should handle LOAD_INGREDIENTS', () => {
    const action = loadIngredients();

    expect(reducer(undefined, action)).toEqual(
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
        isLoading: true,
        loadingFailed: false
      }
    )
  })

  it('should handle LOAD_INGREDIENTS_FAILED', () => {
    const action = loadIngredientsFailed();

    expect(reducer(undefined, action)).toEqual(
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
        loadingFailed: true
      }
    )
  })

  it('should handle LOAD_INGREDIENTS_SUCCESS', () => {
    const action = loadIngredientsSuccess([
      {
        _id: "testId",
        name: "testName",
        type: "testType",
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: "testImg",
        image_mobile: "testImg",
        image_large: "testImg",
        __v: 0
      }
    ]);

    expect(reducer(undefined, action)).toEqual(
      {
        ingredients: [{
          _id: "testId",
          name: "testName",
          type: "testType",
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          price: 0,
          image: "testImg",
          image_mobile: "testImg",
          image_large: "testImg",
          __v: 0,
        }],
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

  it('should handle CHANGE_CURRENT_CATEGORY_BY_ID', () => {
    const action = changeCurrentCategoryById("testId");

    expect(reducer(undefined, action)).toEqual(
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
          currentCategory: "testId",
          categoryIds: [],
          isLoading: false,
          loadingFailed: false
        }
    )
  })

  it('should handle ADD_CATEGORY_ID', () => {
    const action = addCategoryId("testId");

    expect(reducer(undefined, action)).toEqual(
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
        categoryIds: ["testId"],
        isLoading: false,
        loadingFailed: false
      }
    )
  })

  describe('handling ADD_CATEGORY_ID', () => {
    const action = addCategoryId("testId");

    it("should add new id", () =>{
      expect(reducer(undefined, action)).toEqual(
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
          categoryIds: ["testId"],
          isLoading: false,
          loadingFailed: false
        }
      )
    })

    it("should nothing change if the same id passed", () =>{
      const initialState = {
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
        categoryIds: ["testId"],
        isLoading: false,
        loadingFailed: false
      };

      expect(reducer(initialState, action)).toEqual(
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
          categoryIds: ["testId"],
          isLoading: false,
          loadingFailed: false
        }
      )
    })
  })

  it('should handle CHANGE_CURRENT_CATEGORY_BY_DISTANCE', () => {
    const action = changeCurrentCategoryByDistance(["test1", "test2"], 100);

    expect(reducer(undefined, action)).toEqual(
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

  describe('handling CHANGE_CURRENT_INGREDIENT', () => {
    const action = changeCurrentIngredient("testId");

    it("shouldn't have ingredient with passed id", ()=>{
      expect(reducer(undefined, action)).toEqual(
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

    it("should have ingredient", ()=>{
      const initialState = {
        ingredients: [{
          _id: "testId",
          name: "testName",
          type: "testType",
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          price: 0,
          image: "testImg",
          image_mobile: "testImg",
          image_large: "testImg",
          __v: 0
        }],
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
      };

      expect(reducer(initialState, action)).toEqual(
        {
          ingredients: [{
            _id: "testId",
            name: "testName",
            type: "testType",
            proteins: 0,
            fat: 0,
            carbohydrates: 0,
            calories: 0,
            price: 0,
            image: "testImg",
            image_mobile: "testImg",
            image_large: "testImg",
            __v: 0
          }],
          currentIngredient: {
            _id: "testId",
            name: "testName",
            type: "testType",
            proteins: 0,
            fat: 0,
            carbohydrates: 0,
            calories: 0,
            price: 0,
            image: "testImg",
            image_mobile: "testImg",
            image_large: "testImg",
            __v: 0
          },
          currentCategory: undefined,
          categoryIds: [],
          isLoading: false,
          loadingFailed: false
        }
      )
    })
  })

  it('should handle CLEAR_CURRENT_INGREDIENT', () => {
    const initialState = {
      ingredients: [{
        _id: "testId",
        name: "testName",
        type: "testType",
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: "testImg",
        image_mobile: "testImg",
        image_large: "testImg",
        __v: 0
      }],
      currentIngredient: {
        _id: "testId",
        name: "testName",
        type: "testType",
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: "testImg",
        image_mobile: "testImg",
        image_large: "testImg",
        __v: 0
      },
      currentCategory: undefined,
      categoryIds: [],
      isLoading: false,
      loadingFailed: false
    };

    const action = clearCurrentIngredient();

    expect(reducer(initialState, action)).toEqual(
        {
            ingredients: [{
              _id: "testId",
              name: "testName",
              type: "testType",
              proteins: 0,
              fat: 0,
              carbohydrates: 0,
              calories: 0,
              price: 0,
              image: "testImg",
              image_mobile: "testImg",
              image_large: "testImg",
              __v: 0
            }],
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