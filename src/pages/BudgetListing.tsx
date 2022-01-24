import React from 'react';
import { useParams } from 'react-router-dom';
import ExpenseInput from '../components/ExpenseInput';
import ItemList from '../components/ItemList';
import RemainingBudget from '../components/RemainingBudget';
import UserRow from '../components/UserRow';
import { BudgetAPIResponse, BudgetItemArray } from '../models/Budget.model';

const BudgetListing = (): JSX.Element => {
	const { userId } = useParams();

	const [initialBudget, setInitialBudget] = React.useState<number>(0);
	const [userName, setUserName] = React.useState<string>("");
	const [remainingBudget, setRemainingBudget] = React.useState<number>(initialBudget);
	const [items, setItems] = React.useState<BudgetItemArray>([] as BudgetItemArray);
	const [error, setError] = React.useState<boolean>(false);
	const [loading, setLoading] = React.useState<boolean>(true);

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

	React.useEffect(() => {
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
	
	React.useEffect(() => {
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
		<div className="BudgetListing">
			<h1 className="App-title">Personal budget</h1>
			<UserRow userName={userName} budget={initialBudget} />
			<RemainingBudget remainingBudget={remainingBudget} />
			<ExpenseInput addItem={addItem} />
			<ItemList items={items} error={error} loading={loading} />
		</div>
	)
}

export default BudgetListing;
