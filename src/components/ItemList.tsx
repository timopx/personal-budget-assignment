import { BudgetItemArray } from '../models/Budget.model';
import './ItemList.css';

interface IItemListProps {
	items: BudgetItemArray,
	error: boolean,
	loading: boolean
}

function ItemList(props: IItemListProps): JSX.Element
{
	const renderItemsOrMessage = () => {
		if(props.items.length > 0) {
			return props.items.map((item) => (
				<div className="ItemList-item" key={item.id}>
					<div className="ItemList-item-name">{item.name}</div>
					<div className="ItemList-item-price">{item.price}</div>
				</div>
			));
		} else if(props.loading) {
			return <div className='ItemList-item' key="loading-message">Loading items...</div>;
		} else if(props.error) {
			return <div className='ItemList-item' key="error-message" style={{"color": "#cc0000"}}>An error occured trying to retrieve data.</div>;
		}
	}

	return (
		<div className="ItemList">
			{renderItemsOrMessage()}
		</div>
	);
}

export default ItemList;
