import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BudgetAPIResponse, BudgetItemArray } from "../models/Budget.model";

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

const BudgetProvider = ({ children }: {children: JSX.Element}): JSX.Element => {
    const { userId } = useParams();

    const [initialBudget, setInitialBudget] = useState<number>(0);
	const [userName, setUserName] = useState<string>("");
	const [remainingBudget, setRemainingBudget] = useState<number>(initialBudget);
	const [items, setItems] = useState<BudgetItemArray>([] as BudgetItemArray);
	const [error, setError] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

    const addItem = (name: string, price: number | ""): boolean => {
		if(price === "" || price < 0.01 || name === "")
			return false;

		const roundedPrice = Math.round(price * 100) / 100;
		
		const newItems = [...items];
		newItems.push({
			id: items.length > 0
			? items[items.length - 1].id + 1
				: 1,
			name: name,
			price: roundedPrice
		});
		setItems(newItems);
		
		return true;
	}

    useEffect(() => {
		fetch(`https://61ed57eff3011500174d23dd.mockapi.io/budget/${userId}`)
		.then((response) => {
			if(!response.ok) throw Error("Request not successful.");
			return response.json();
		}).then((jsonResponse: BudgetAPIResponse) => {
			for(let i = 0; i < jsonResponse.items.length; i++)
				jsonResponse.items[i].price = parseFloat(jsonResponse.items[i].price?.toString() ?? "0");
			// I wasn't able to make the mock API give me a float value as a float value instead of a string so I have to convert it.
			// I actually convert `jsonResponse.items[i].price` to string although it's already a string because of typescript

			setInitialBudget(jsonResponse.budget);
			setItems(jsonResponse.items);
			setUserName(jsonResponse.userName);
		}).catch((error) => {
			setError(true);
			console.error("There was an error trying to retrieve data.");
		}).finally(() => {
			setLoading(false);
		});
	}, [userId]);
	
	useEffect(() => {
		const updateRemainingBudget = () => {
			let newRemainingBudget: number = initialBudget;
			
			for(const item of items)
			newRemainingBudget -= item.price === null ? 0 : item.price;
			
			// everything should be rounded to 2 decimal places to prevent ugly javascript math
			newRemainingBudget = Math.round(newRemainingBudget * 100) / 100;
			
			setRemainingBudget(newRemainingBudget);
		}

		updateRemainingBudget();
	}, [items, initialBudget]);

    return (
        <BudgetContext.Provider
            value={{
                userName: userName,
                initialBudget: initialBudget,
                remainingBudget: remainingBudget,
                items: items,
                loading: loading,
                error: error,
                addItem: addItem
            }}
        >
            { children }
        </BudgetContext.Provider>
    );
}

export default BudgetProvider;
