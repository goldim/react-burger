import { LOAD_INGREDIENTS } from "../constants/load-ingredients";

export interface ILoadIngredientsAction {
    readonly type: typeof LOAD_INGREDIENTS;
}

export type TAuthActions = ILoadIngredientsAction