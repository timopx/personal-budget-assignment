import { Link } from "react-router-dom";
import style from './LinkList.module.css';

interface ILinkListProps {
    links: {name: string, path?: string}[]
}

const LinkList = (props: ILinkListProps): JSX.Element => {
    return (
        <ul className={style.list}>
            {props.links.map(link => (
                <li><Link to={link.path || link.name} className={style.list_link}>{link.name}</Link></li>
            ))}
        </ul>
    );
}

export default LinkList;
