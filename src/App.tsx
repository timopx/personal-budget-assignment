import { Routes, BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import BudgetListing from './pages/BudgetListing';
import Home from './pages/Home';

const App = (): JSX.Element => {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={ <Home/> }></Route>
					<Route path="/BudgetListing" element={ <BudgetListing /> }></Route>
					<Route path="/BudgetListing/:userId" element={ <BudgetListing /> }></Route>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App;

/*
Create application using React using features:

- [x] Router - your app should have at least 2 routes (pages) -> `App.tsx` :11-:13
- [x] bonus: dynamic route, i.e. using :someId -> `App.tsx` :13

- [x] use hooks - useState, useEffect -> `BudgetListing.tsx`
- [] bonus: useContext, useReducer

- [x] pass prop(s) to child component -> `BudgetListing.tsx` :78
- [x] update state of parent component from child using any technique -> `ExpenseInput.tsx` :34
- [x] dynamic styles based on state/prop of the component, f.e. red/green indicators -> `RemainingBudget.tsx` :16

- [x] fetch and display data from external API, f.e. using some mock response -> `BudgetListing.tsx` :39
- [x] bonus: handling/displaying error -> `BudgetListing.tsx` :41, :53; `ItemList.tsx` :23
- [x] bonus2: add loading indicator/placeholder - f.e loading icon  -> `ItemList.tsx` :21

TODO: Make a prompt for /BudgetListing without /:userId
TODO: Maybe consider trying out HoC
TODO: Make use of useContext, useReducer
TODO: Adding an item should add an item to the API aswell
*/
