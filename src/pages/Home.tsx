import LinkList from "../components/LinkList";

const homeLinks = [
    {name: "Home", path: "/"},
    {name: "BudgetListing"}
]

const Home = (): JSX.Element => {
    return (
        <div>
            <LinkList links={homeLinks}></LinkList>
        </div>
    )
}

export default Home;
