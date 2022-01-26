import ExpenseInput from '../components/ExpenseInput';
import ItemList from '../components/ItemList';
import RemainingBudget from '../components/RemainingBudget';
import UserRow from '../components/UserRow';
import BudgetProvider from '../store/BudgetProvider';

const BudgetListing = (): JSX.Element => {

	return (
		<BudgetProvider>
			<div className="BudgetListing">
				<h1 className="App-title">Personal budget</h1>
				<UserRow />
				<RemainingBudget />
				<ExpenseInput />
				<ItemList />
			</div>
		</BudgetProvider>
	)
}

export default BudgetListing;
