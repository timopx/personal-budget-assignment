import React, { useContext, useState } from 'react';
import './ExpenseInput.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { BudgetContext } from '../store/BudgetProvider';

const ExpenseInput = () => {
	const [name, setName] = useState("");
	const [price, setPrice] = useState<number | "">("");

	const { addItem } = useContext(BudgetContext);
	
	const callAddItem = () =>
	{
		const itemWasAdded = addItem(name, price);
	
		if(itemWasAdded) {
			setName("");
			setPrice("");
		}
	}

	const handleClick = (mouseEvent: React.MouseEvent) =>
	{
		mouseEvent.preventDefault();
	
		callAddItem();
	}

	const handleKeyDown = (keyboardEvent: React.KeyboardEvent) =>
	{
		keyboardEvent.key === "Enter" && callAddItem();
	}
	
	const handleKeyDownPreventE = (keyboardEvent: React.KeyboardEvent) =>
	{
		keyboardEvent.key === 'e' && keyboardEvent.preventDefault();
		keyboardEvent.key === "Enter" && callAddItem();
	}
	
	return (
		<div className="ExpenseInput">
			<div className="ExpenseInput-heading">Add expense</div>
			<div className="ExpenseInput-input-container">
				<div className="ExpenseInput-named-input">
					<div className="ExpenseInput-named-input-name">Name</div>
					<input type="text"
						value={name}
						onKeyDown={ handleKeyDown }
						onChange={ (e) => setName(e.target.value) }
					/>
				</div>
				<div className="ExpenseInput-named-input">
					<div className="ExpenseInput-named-input-price">Price</div>
					<input type="number"
						value={ price }
						onKeyDown={ handleKeyDownPreventE }
						onChange={ (e) => setPrice(isNaN(parseFloat(e.target.value))
																		? ""
																		: parseFloat(e.target.value)) }
					/>
				</div>
				<FontAwesomeIcon icon={faPlusCircle} className="ExpenseInput-submit" onClick={handleClick} />
			</div>
		</div>
	);
}

export default ExpenseInput;
