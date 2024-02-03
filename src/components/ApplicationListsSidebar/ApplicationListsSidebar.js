import { Link } from "react-router-dom";
import "./ApplicationListsSidebar.scss";
const ApplicationListsSidebar = (props) => {
  return (
    <article className="sidebar">
      {props.applicationLists.map((item) => {
        return (
          <Link
            key={item.id}
            to={`/applicationDetail/${item.id}`}
            className={
              props.currentCompany === item.company_name
                ? "sidebar__active-company "
                : "sidebar__company"
            }
          >
            <span>{item.company_name}</span>
          </Link>
        );
      })}
    </article>
  );
};
export default ApplicationListsSidebar;
