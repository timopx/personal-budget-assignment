import { useContext } from 'react';
import { BudgetContext } from '../store/BudgetProvider';
import './ItemList.css';

function ItemList(): JSX.Element
{
	const { items, loading, error } = useContext(BudgetContext);

	const renderItemsOrMessage = () => {
		if(items.length > 0) {
			return items.map((item) => (
				<div className="ItemList-item" key={item.id}>
					<div className="ItemList-item-name">{item.name}</div>
					<div className="ItemList-item-price">{item.price}</div>
				</div>
			));
		} else if(loading) {
			return <div className='ItemList-item' key="loading-message">Loading items...</div>;
		} else if(error) {
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
