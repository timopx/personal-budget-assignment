import './UserRow.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { BudgetContext } from '../store/BudgetProvider';

function UserRow(): JSX.Element
{
	const { userName, initialBudget } = useContext(BudgetContext);

	return (
		<div className="UserRow">
			<div className="UserRow-user">
				<FontAwesomeIcon icon={faUserCircle} className="UserRow-icon" />
				<div className="UserRow-name">{userName}</div>
			</div>
			<div className="UserRow-budget">Your Budget: <span style={ {fontStyle: "italic"} }>{initialBudget}</span></div>
		</div>
	);
}

export default UserRow;
