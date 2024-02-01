import { Link } from "react-router-dom";
import "./ApplicationListsSidebar.scss";
const ApplicationListsSidebar = (props) => {
  return (
    <article>
      {props.applicationLists.map((item) => {
        return (
          <Link key={item.id} to={`/applicationDetail/${item.id}`}>
            <p>{item.company_name}</p>
          </Link>
        );
      })}
    </article>
  );
};
export default ApplicationListsSidebar;
