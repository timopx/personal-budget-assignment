import './RemainingBudget.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { BudgetContext } from '../store/BudgetProvider';


function RemainingBudget(): JSX.Element
{
	const { remainingBudget } = useContext(BudgetContext);

	return (
		<div className="RemainingBudget">
			<FontAwesomeIcon icon={faDollarSign} size="2x" className="RemainingBudget-icon" />
			<div className="RemainingBudget-textvalue-container">
				<div className="RemainingBudget-text">remaining</div>
				<div className="RemainingBudget-value" style={ {color: remainingBudget < 0 ? "#cc0000" : "inherit"} }>{remainingBudget}</div>
			</div>
		</div>
	);
}

export default RemainingBudget;
