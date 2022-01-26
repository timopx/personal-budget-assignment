import { createContext, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { BudgetAPIResponse, BudgetItemArray } from "../models/Budget.model";
import budgetReducer, { BudgetReducerAction, IBudgetReducerState } from "./budgetReducer";

interface IBudgetContext {
    initialBudget: number,
    userName: string,
    remainingBudget: number,
    items: BudgetItemArray,
    error: boolean,
    loading: boolean
    addItem(name: string, price: number | ""): boolean
};

export const BudgetContext = createContext({} as IBudgetContext);

const budgetReducerInitialState: IBudgetReducerState = {
	userName: "",
	initialBudget: 0,
	remainingBudget: 0,
	items: [],
	error: false,
	loading: true
}

const BudgetProvider = ({ children }: {children: JSX.Element}): JSX.Element => {
    const { userId } = useParams();

	const [budgetReducerState, budgetReducerDispatch] = useReducer(budgetReducer, budgetReducerInitialState);

    const addItem = (name: string, price: number | ""): boolean => {
		if(price === "" || price < 0.01 || name === "")
			return false;

		const roundedPrice = Math.round(price * 100) / 100;
		
		budgetReducerDispatch({
			type: BudgetReducerAction.ADD_ITEM,
			payload: {
				id: budgetReducerState.items.length > 0
					? budgetReducerState.items[budgetReducerState.items.length] + 1
					: 1,
				name: name,
				price: roundedPrice
			}
		});
		
		return true;
	}

    useEffect(() => {
		budgetReducerDispatch({type: BudgetReducerAction.LOADING_START});

		fetch(`https://61ed57eff3011500174d23dd.mockapi.io/budget/${userId}`)
		.then((response) => {
			if(!response.ok) throw Error("Request not successful.");
			return response.json();
		}).then((jsonResponse: BudgetAPIResponse) => {
			for(let i = 0; i < jsonResponse.items.length; i++)
				jsonResponse.items[i].price = parseFloat(jsonResponse.items[i].price?.toString() ?? "0");
			// I wasn't able to make the mock API give me a float value as a float value instead of a string so I have to convert it.
			// I actually convert `jsonResponse.items[i].price` to string although it's already a string because of typescript

			budgetReducerDispatch({type: BudgetReducerAction.SET_INITIAL_BUDGET, payload: jsonResponse.budget});
			budgetReducerDispatch({type: BudgetReducerAction.SET_ITEMS, payload: jsonResponse.items});
			budgetReducerDispatch({type: BudgetReducerAction.SET_USERNAME, payload: jsonResponse.userName});
		}).catch((error) => {
			budgetReducerDispatch({type: BudgetReducerAction.ERROR});
			console.error("There was an error trying to retrieve data.");
		}).finally(() => {
			budgetReducerDispatch({type: BudgetReducerAction.LOADING_STOP});
		});
	}, [userId]);
	
    return (
        <BudgetContext.Provider
            value={{
                userName: budgetReducerState.userName,
                initialBudget: budgetReducerState.initialBudget,
                remainingBudget: budgetReducerState.remainingBudget,
                items: budgetReducerState.items,
                loading: budgetReducerState.loading,
                error: budgetReducerState.error,
                addItem: addItem
            }}
        >
            { children }
        </BudgetContext.Provider>
    );
}

export default BudgetProvider;
