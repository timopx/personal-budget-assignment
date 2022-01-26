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

// *SOME OF THESE MAY NOT BE PRESENT HERE ANYMORE DUE TO MOVING STUFF TO MAKE USE OF CONTEXTS & REDUCERS*
// YOU MAY CHECKOUT 3239b1f161ea00cc376d435208c61298352a43b0 IF THERE'S SOMETHING MISSING e.g. PASSING PROP TO CHILD COMPONENT

- [x] Router - your app should have at least 2 routes (pages)
- [x] bonus: dynamic route, i.e. using :someId

- [x] use hooks - useState, useEffect
- [x] bonus: useContext, useReducer

- [x] pass prop(s) to child component
- [x] update state of parent component from child using any technique
- [x] dynamic styles based on state/prop of the component, f.e. red/green indicators

- [x] fetch and display data from external API, f.e. using some mock response
- [x] bonus: handling/displaying error
- [x] bonus2: add loading indicator/placeholder - f.e loading icon

TODO: Make a prompt for /BudgetListing without /:userId
TODO: Maybe consider trying out HoC
TODO: Adding an item should add an item to the API aswell
*/
