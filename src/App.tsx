import React from 'react';
import './App.css';
import ExpenseInput from './components/ExpenseInput';
import ItemList from './components/ItemList';
import RemainingBudget from './components/RemainingBudget';
import UserRow from './components/UserRow';

interface IAppState {
	remainingBudget: number,
	items: Array<{name: string, price: number | null}>
}

export default class App extends React.Component<{}, IAppState>
{
	private budget: number = 2000; // would probably be resolved from an API in the real world

	constructor()
	{
		super({});

		this.state = {
			remainingBudget: this.budget,
			items: []
		}

		this.addItem = this.addItem.bind(this);
	}

	addItem(name: string, price: number | ""): boolean
	{
		if(price === "" || price > this.state.remainingBudget || price < 0.01
			|| name === "")
			return false;

		const roundedPrice = Math.round(price * 100) / 100;

		this.setState((prevState) => {
			const newState = {...prevState};
			
			newState.items.push({name: name, price: roundedPrice});

			this.updateRemainingBudget();

			return newState;
		});

		return true;
	}

	updateRemainingBudget()
	{
		let newRemainingBudget: number = this.budget;

		for(const item of this.state.items)
			newRemainingBudget -= item.price === null ? 0 : item.price;

		// evetything should be rounded to 2 decimal places to prevent ugly javascript math
		newRemainingBudget = Math.round(newRemainingBudget * 100) / 100;

		this.setState({remainingBudget: newRemainingBudget});
	}

	render()
	{
		return (
			<div className="App">
				<h1 className="App-title">Personal budget</h1>
				<UserRow firstName="John" lastName="Doe" budget={this.budget} />
				<RemainingBudget remainingBudget={this.state.remainingBudget} />
				<ExpenseInput addItem={this.addItem} />
				<ItemList items={this.state.items} />
			</div>
		);
	}
}
