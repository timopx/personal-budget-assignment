import { BudgetItemArray } from "../models/Budget.model";

export interface IBudgetReducerState {
    userName: string,
    items: BudgetItemArray,
    initialBudget: number,
    remainingBudget: number,
    error: boolean,
    loading: boolean
}

interface IBudgetReducerAction {
    type: BudgetReducerAction,
    payload?: any
}

export enum BudgetReducerAction {
    LOADING_START, LOADING_STOP,
    ERROR,
    SET_USERNAME,
    SET_INITIAL_BUDGET,
    SET_ITEMS, ADD_ITEM
}

const budgetReducer = (state: IBudgetReducerState, action: IBudgetReducerAction) => {
    switch(action.type) {
        case BudgetReducerAction.LOADING_START:
            return {...state, loading: true};
        case BudgetReducerAction.LOADING_STOP:
            return {...state, loading: false};
        case BudgetReducerAction.ERROR:
            return {...state, error: true};
        case BudgetReducerAction.SET_INITIAL_BUDGET:
            return {...state, initialBudget: action.payload};
        case BudgetReducerAction.SET_USERNAME:
            return {...state, userName: action.payload};
        case BudgetReducerAction.SET_ITEMS:
            return {...state, remainingBudget: calculateRemainingBudget(state.initialBudget, action.payload), items: action.payload};
        case BudgetReducerAction.ADD_ITEM:
            const newItems = [...state.items];
            
            newItems.push(action.payload);

            return {...state, remainingBudget: calculateRemainingBudget(state.initialBudget, newItems), items: newItems};
    }
}

// I'm not sure if this's supposed to be here or in the provider
const calculateRemainingBudget = (initialBudget: number, items: BudgetItemArray) => {
    let newRemainingBudget: number = initialBudget;
    
    for(const item of items)
        newRemainingBudget -= item.price === null ? 0 : item.price;
    
    // everything should be rounded to 2 decimal places to prevent ugly javascript math
    newRemainingBudget = Math.round(newRemainingBudget * 100) / 100;
    
    return newRemainingBudget;
}

export default budgetReducer;
