import './ItemList.css';

interface IItemListProps {
	items: Array<{name: string, price: number | null}>
}

function ItemList(props: IItemListProps): JSX.Element
{
	const itemListItems = props.items.map((prop) => {
		return (
			<div className="ItemList-item">
				<div className="ItemList-item-name">{prop.name}</div>
				<div className="ItemList-item-price">{prop.price}</div>
			</div>
		);
	});

	return (
		<div className="ItemList">
			{itemListItems.length === 0
				? <div className="ItemList-item">You haven't added anything to the list yet.</div>
				: itemListItems}
		</div>
	);
}

export default ItemList;
