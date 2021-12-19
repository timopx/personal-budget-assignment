import './RemainingBudget.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

interface IRemainingBudgetProps {
	remainingBudget: number
}

function RemainingBudget(props: IRemainingBudgetProps): JSX.Element
{
	return (
		<div className="RemainingBudget">
			<FontAwesomeIcon icon={faDollarSign} size="2x" className="RemainingBudget-icon" />
			<div className="RemainingBudget-textvalue-container">
				<div className="RemainingBudget-text">remaining</div>
				<div className="RemainingBudget-value">{props.remainingBudget}</div>
			</div>
		</div>
	);
}

export default RemainingBudget;
