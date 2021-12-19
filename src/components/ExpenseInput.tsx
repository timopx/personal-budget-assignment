import React from 'react';
import './ExpenseInput.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

interface IExpenseInputProps {
	addItem(name: string, price: number | ""): boolean
}

interface IExpenseInputState {
	name: string,
	price: number | ""
}

export default class ExpenseInput extends React.Component<IExpenseInputProps, IExpenseInputState>
{
	// This whole thing or some parts of it can be turned into separate components which would make them be able to be reused in future expansions of the project.
	constructor(props: IExpenseInputProps)
	{
		super(props);

		this.state = {
			name: "",
			price: ""
		}

		this.handleClick = this.handleClick.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyDownPreventE = this.handleKeyDownPreventE.bind(this);
	}

	callAddItem()
	{
		const itemWasAdded = this.props.addItem(this.state.name, this.state.price);

		if(itemWasAdded) this.setState({name: "", price: ""});
	}

	handleClick(mouseEvent: React.MouseEvent)
	{
		mouseEvent.preventDefault();

		this.callAddItem();
	}

	handleKeyDown(keyboardEvent: React.KeyboardEvent)
	{
		keyboardEvent.key === "Enter" && this.callAddItem();
	}

	handleKeyDownPreventE(keyboardEvent: React.KeyboardEvent)
	{
		keyboardEvent.key === 'e' && keyboardEvent.preventDefault();
		keyboardEvent.key === "Enter" && this.callAddItem();
	}

	render()
	{
		return (
			<div className="ExpenseInput">
				<div className="ExpenseInput-heading">Add expense</div>
				<div className="ExpenseInput-input-container">
					<div className="ExpenseInput-named-input">
						<div className="ExpenseInput-named-input-name">Name</div>
						<input type="text"
							value={this.state.name}
							onKeyDown={ this.handleKeyDown }
							onChange={ (e) => this.setState({name: e.target.value}) }
						/>
					</div>
					<div className="ExpenseInput-named-input">
						<div className="ExpenseInput-named-input-price">Price</div>
						<input type="number"
							value={ this.state.price }
							onKeyDown={ this.handleKeyDownPreventE }
							onChange={ (e) => this.setState({price: isNaN(parseFloat(e.target.value))
																			? ""
																			: parseFloat(e.target.value)}) }
						/>
					</div>
					<FontAwesomeIcon icon={faPlusCircle} className="ExpenseInput-submit" onClick={this.handleClick} />
				</div>
			</div>
		);
	}
}
