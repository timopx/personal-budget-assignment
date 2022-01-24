import './UserRow.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

interface IUserRowProps {
	userName: string,
	budget: number
}

function UserRow(props: IUserRowProps): JSX.Element
{
	return (
		<div className="UserRow">
			<div className="UserRow-user">
				<FontAwesomeIcon icon={faUserCircle} className="UserRow-icon" />
				<div className="UserRow-name">{props.userName}</div>
			</div>
			<div className="UserRow-budget">Your Budget: <span style={ {fontStyle: "italic"} }>{props.budget}</span></div>
		</div>
	);
}

export default UserRow;
